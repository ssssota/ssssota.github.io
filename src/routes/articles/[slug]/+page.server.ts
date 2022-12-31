import { GITHUB_REPOSITORY, GITHUB_TOKEN } from '$env/static/private';
import { Client } from '$lib/data/client';
import type { PageServerLoad } from './$types';

const [owner, name] = GITHUB_REPOSITORY.split('/');

export const load = (async ({ params }) => {
  const client = new Client(GITHUB_TOKEN, {
    repository: { name, owner },
    articleCategorySlug: 'articles',
  });
  return {
    article: await client.getArticle(params.slug),
  };
}) satisfies PageServerLoad;
