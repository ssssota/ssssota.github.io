import articles from '$lib/articles.json';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
  const article = articles.find(({ slug }) => params.slug === slug);
  if (article === undefined) throw error(404, 'Not Found');
  return { article };
}) satisfies PageServerLoad;
