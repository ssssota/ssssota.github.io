import { Octokit } from '@octokit/core';
import { print } from 'graphql';
import * as fs from 'node:fs/promises';
import * as process from 'node:process';
import type {
  GetDiscussionCategoryBySlugQuery,
  GetDiscussionCategoryBySlugQueryVariables,
  GetDiscussionsByCategoryQuery,
  GetDiscussionsByCategoryQueryVariables,
} from '../graphql-type/types';
import {
  GetDiscussionCategoryBySlug,
  GetDiscussionsByCategory,
} from '../graphql-type/types';

async function main() {
  const token = process.env.GITHUB_TOKEN;
  if (token === undefined) throw new Error('Set GITHUB_TOKEN env var');
  const [owner, repo] = process.env.GITHUB_REPOSITORY?.split('/') ?? [];
  if (!owner || !repo) throw new Error('Set GITHUB_REPOSITORY env var');
  const client = new Client(token, {
    articleCategorySlug: 'articles',
    repository: { owner, name: repo },
  });
  const articles = await client.getArticles();
  const code = [JSON.stringify(articles, undefined, 2), ''].join('\n');
  await fs.writeFile('src/lib/articles.json', code);
}

type ArticleBase = {
  slug: string;
  title: string;
  body: string;
  createdAt: string;
  description: string;
  discussionUrl: string;
};
type Repository = {
  owner: string;
  name: string;
};
type ClientOptions = {
  repository: Repository;
  articleCategorySlug: string;
};

class Client {
  private octokit: Octokit;
  constructor(token: string, private options: ClientOptions) {
    this.octokit = new Octokit({ auth: token });
  }

  async getArticles(): Promise<ArticleBase[]> {
    const category =
      await this.octokit.graphql<GetDiscussionCategoryBySlugQuery>(
        print(GetDiscussionCategoryBySlug),
        {
          owner: this.options.repository.owner,
          repo: this.options.repository.name,
          slug: this.options.articleCategorySlug,
        } satisfies GetDiscussionCategoryBySlugQueryVariables
      );
    const categoryId = category.repository?.discussionCategory?.id;
    if (categoryId === undefined) throw new Error('Category not found.');

    const articles: ArticleBase[] = [];
    let cursor: string | undefined = undefined;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const res: GetDiscussionsByCategoryQuery =
        await this.octokit.graphql<GetDiscussionsByCategoryQuery>(
          print(GetDiscussionsByCategory),
          {
            owner: this.options.repository.owner,
            repo: this.options.repository.name,
            categoryId,
            cursor,
          } satisfies GetDiscussionsByCategoryQueryVariables
        );
      res.repository?.discussions.nodes?.forEach((disc) => {
        if (disc === null) return;
        articles.push({
          body: disc.body,
          title: disc.title,
          slug: disc.number.toString(),
          createdAt: disc.createdAt,
          description:
            disc.bodyText.length > 80
              ? `${disc.bodyText.slice(0, 80)} ...`
              : disc.bodyText,
          discussionUrl: disc.url,
        });
      });
      if (
        res.repository?.discussions.pageInfo.hasNextPage !== true ||
        res.repository?.discussions.pageInfo.endCursor == null
      )
        break;
      cursor = res.repository.discussions.pageInfo.endCursor;
    }
    return articles;
  }
}

main().catch(console.error);
