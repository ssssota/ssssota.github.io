import articles from '$lib/articles.json';
import type { PageServerLoad } from './$types';

export const load = (async () => {
  return { articles };
}) satisfies PageServerLoad;
