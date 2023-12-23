import articles from '$lib/data/articles.json';
import { makeOgpImage } from '$lib/ogp';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const prerender = true;
export const GET: RequestHandler = async ({ params }) => {
  const article = articles.find(({ slug }) => params.slug === slug);
  if (article === undefined) error(404, 'Not Found');
  return new Response(await makeOgpImage(article.title), {
    headers: { 'content-type': 'image/png' },
  });
};
