import { Octokit } from '@octokit/core';
import { print } from 'graphql';
import * as fs from 'node:fs/promises';
import * as process from 'node:process';
import {
  GetDiscussionCategoryBySlug,
  GetDiscussionCategoryBySlugQuery,
  GetDiscussionCategoryBySlugQueryVariables,
  GetDiscussionsByCategory,
  GetDiscussionsByCategoryQuery,
  GetDiscussionsByCategoryQueryVariables,
  GetRateLimitStatus,
  GetRateLimitStatusQuery,
} from './types';

const dummyArticles: ArticleBase[] = [
  {
    slug: '1',
    title: 'Test',
    body: '# Test',
    description: 'Test',
    createdAt: '2023-01-02T12:38:26Z',
    discussionUrl: 'https://github.com/ssssota/ssssota.github.io/discussions/1',
  },
];
const dummyScraps: ScrapBase[] = [
  {
    title: 'ssssota.devにScrapsを生やす',
    slug: '18',
    createdAt: '2023-01-15T12:59:37Z',
    description:
      'ssssota.devにZenn.devのようなスクラップ機能を作っていく。\n作業ログ兼サンプルデータとしてこれを残す。',
    discussionUrl:
      'https://github.com/ssssota/ssssota.github.io/discussions/18',
    threads: [
      {
        author: 'ssssota',
        body: 'https://github.com/ssssota/ssssota.github.io/tree/f7e46d9fac96a3e7e0197a1470b70cb8fc283b9a/graphql-type/documents\r\nここにあるやつは使いまわせそう。\r\n追加でコメントを取得する必要がある。',
        comments: [],
      },
      {
        author: 'ssssota',
        body: 'SSGしたいので予め全件取得したいけどGraphQLのカーソルしんどすぎるな...\r\nDiscussionsがGraphQLしかないとわかってたけどページネーションがあるパターンのGraphQLは結構大変という学びを得た',
        comments: [
          {
            author: 'ssssota',
            body: 'とりあえず個数決め打ちでやる\r\nオーバーしたらこっちに流すかなぁ',
          },
        ],
      },
    ],
  },
];
async function main() {
  let articles = dummyArticles;
  let scraps = dummyScraps;
  try {
    const token = process.env.GITHUB_TOKEN;
    if (!token) throw 'Set environment variable: GITHUB_TOKEN';
    const [owner, repo] = process.env.GITHUB_REPOSITORY?.split('/') ?? [];
    if (!owner || !repo) throw 'Set environment variable: GITHUB_REPOSITORY';
    const client = new Client(token, {
      articlesCategorySlug: 'articles',
      scrapsCategorySlug: 'scraps',
      repository: { owner, name: repo },
    });
    articles = await client.getArticles();
    scraps = await client.getScraps();
    const remaining = await client.getRateLimitRemaining();
    console.log(`GitHub GraphQL API Rate Limit remaining: ${remaining}`);
  } catch (e) {
    console.error(e);
  } finally {
    await Promise.all([
      fs.writeFile(
        'src/lib/data/articles.json',
        [JSON.stringify(articles, undefined, 2), ''].join('\n')
      ),
      fs.writeFile(
        'src/lib/data/scraps.json',
        [JSON.stringify(scraps, undefined, 2), ''].join('\n')
      ),
    ]);
  }
}

type ArticleBase = {
  slug: string;
  title: string;
  body: string;
  createdAt: string;
  description: string;
  discussionUrl: string;
};
type ScrapBase = {
  slug: string;
  title: string;
  createdAt: string;
  description: string;
  discussionUrl: string;
  threads: {
    author: string;
    body: string;
    comments: {
      author: string;
      body: string;
    }[];
  }[];
};
type Repository = {
  owner: string;
  name: string;
};
type ClientOptions = {
  repository: Repository;
  articlesCategorySlug: string;
  scrapsCategorySlug: string;
};
type NonNullable<T> = Exclude<T, null | undefined>;

class Client {
  private octokit: Octokit;
  constructor(token: string, private options: ClientOptions) {
    this.octokit = new Octokit({ auth: token });
  }

  async getRateLimitRemaining(): Promise<number> {
    const { rateLimit } = await this.octokit.graphql<GetRateLimitStatusQuery>(
      print(GetRateLimitStatus)
    );
    return rateLimit?.remaining ?? 0;
  }

  async getArticles(): Promise<ArticleBase[]> {
    const category =
      await this.octokit.graphql<GetDiscussionCategoryBySlugQuery>(
        print(GetDiscussionCategoryBySlug),
        {
          owner: this.options.repository.owner,
          repo: this.options.repository.name,
          slug: this.options.articlesCategorySlug,
        } satisfies GetDiscussionCategoryBySlugQueryVariables
      );
    const categoryId = category.repository?.discussionCategory?.id;
    if (categoryId === undefined) throw new Error('Category not found.');

    let articles: NonNullable<
      NonNullable<
        GetDiscussionsByCategoryQuery['repository']
      >['discussions']['nodes']
    > = [];
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
      const nodes = res.repository?.discussions.nodes;
      if (nodes != null) {
        articles = [...articles, ...nodes];
      }
      if (
        res.repository?.discussions.pageInfo.hasNextPage !== true ||
        res.repository?.discussions.pageInfo.endCursor == null
      )
        break;
      cursor = res.repository.discussions.pageInfo.endCursor;
    }
    return articles.flatMap((disc) => {
      return disc != null
        ? [
            {
              body: disc.body,
              title: disc.title,
              slug: disc.number.toString(),
              createdAt: disc.createdAt,
              description:
                disc.bodyText.length > 80
                  ? `${disc.bodyText.slice(0, 80)} ...`
                  : disc.bodyText,
              discussionUrl: disc.url,
            },
          ]
        : [];
    });
  }

  async getScraps(): Promise<ScrapBase[]> {
    const category =
      await this.octokit.graphql<GetDiscussionCategoryBySlugQuery>(
        print(GetDiscussionCategoryBySlug),
        {
          owner: this.options.repository.owner,
          repo: this.options.repository.name,
          slug: this.options.scrapsCategorySlug,
        } satisfies GetDiscussionCategoryBySlugQueryVariables
      );
    const categoryId = category.repository?.discussionCategory?.id;
    if (categoryId === undefined) throw new Error('Category not found.');

    let scraps: NonNullable<
      NonNullable<
        GetDiscussionsByCategoryQuery['repository']
      >['discussions']['nodes']
    > = [];
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
      const nodes = res.repository?.discussions.nodes;
      if (nodes != null) {
        scraps = [...scraps, ...nodes];
      }
      if (
        res.repository?.discussions.pageInfo.hasNextPage !== true ||
        res.repository?.discussions.pageInfo.endCursor == null
      )
        break;
      cursor = res.repository.discussions.pageInfo.endCursor;
    }
    return scraps.flatMap((disc) => {
      return disc != null
        ? [
            {
              title: disc.title,
              slug: disc.number.toString(),
              createdAt: disc.createdAt,
              description: disc.bodyText,
              discussionUrl: disc.url,
              threads:
                disc.comments.nodes?.flatMap((comment) => {
                  return comment != null
                    ? [
                        {
                          author: comment.author?.login ?? 'octocat',
                          body: comment.body,
                          comments:
                            comment.replies.nodes?.flatMap((reply) => {
                              return reply != null
                                ? [
                                    {
                                      author: reply.author?.login ?? 'octocat',
                                      body: reply.body,
                                    },
                                  ]
                                : [];
                            }) ?? [],
                        },
                      ]
                    : [];
                }) ?? [],
            },
          ]
        : [];
    });
  }
}

main();
