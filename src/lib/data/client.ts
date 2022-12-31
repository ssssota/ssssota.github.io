import { Octokit } from '@octokit/core';
import { print } from 'graphql';
import type {
  GetDiscussionCategoryBySlugQuery,
  GetDiscussionCategoryBySlugQueryVariables,
  GetDiscussionsByCategoryQuery,
  GetDiscussionsByCategoryQueryVariables,
} from 'graphql-type';
import {
  GetDiscussionCategoryBySlug,
  GetDiscussionsByCategory,
} from 'graphql-type';

type Article = {
  slug: string;
  title: string;
  body: string;
  createdAt: Date;
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

export class Client {
  private octokit: Octokit;
  constructor(token: string, private options: ClientOptions) {
    this.octokit = new Octokit({ auth: token });
  }

  async getArticles(): Promise<Article[]> {
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

    const articles: Article[] = [];
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
          createdAt: new Date(disc.createdAt),
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
