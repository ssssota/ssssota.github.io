// @ts-check
import { Octokit } from '@octokit/core';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { env } from 'process';

if (!env.GITHUB_REPOSITORY)
  throw new Error('Set environment variable `GITHUB_REPOSITORY`');
const [owner, name] = env.GITHUB_REPOSITORY.split('/');

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter(),
    prerender: {
      entries: [
        '*',
        ...(await getArticlePathList({
          repository: { owner, name },
          articleCategorySlug: 'articles',
        })),
      ],
    },
  },
};

async function getArticlePathList(options) {
  const octokit = new Octokit({ auth: env.GITHUB_TOKEN });
  const category = await octokit.graphql(
    `query GetDiscussionCategoryBySlug(
      $owner: String!
      $repo: String!
      $slug: String!
    ) {
      repository(owner: $owner, name: $repo) {
        discussionCategory(slug: $slug) {
          id
        }
      }
    }`,
    {
      owner: options.repository.owner,
      repo: options.repository.name,
      slug: options.articleCategorySlug,
    }
  );
  const categoryId = category.repository?.discussionCategory?.id;
  if (categoryId === undefined) throw new Error('Category not found.');

  const articles = [];
  let cursor = undefined;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const res = await octokit.graphql(
      `query getDiscussionsByCategory(
        $owner: String!
        $repo: String!
        $categoryId: ID!
        $cursor: String
      ) {
        repository(owner: $owner, name: $repo) {
          discussions(categoryId: $categoryId, first: 20, after: $cursor) {
            nodes {
              number
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      }`,
      {
        owner: options.repository.owner,
        repo: options.repository.name,
        categoryId,
        cursor,
      }
    );
    res.repository?.discussions.nodes?.forEach((disc) => {
      if (disc === null) return;
      articles.push(`/articles/${disc.number}`);
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

export default config;
