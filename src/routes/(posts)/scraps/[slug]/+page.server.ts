import scraps from '$lib/data/scraps.json';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
  const scrap = scraps.find(({ slug }) => params.slug === slug);
  if (scrap === undefined) error(404, 'Not Found');
  return { scrap };
}) satisfies PageServerLoad;
