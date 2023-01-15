import articles from '$lib/data/articles.json';
import type { PageServerLoad } from './$types';

export const load = (async () => {
  return { articles };
}) satisfies PageServerLoad;
