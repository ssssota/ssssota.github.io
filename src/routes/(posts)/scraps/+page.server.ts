import scraps from '$lib/data/scraps.json';
import type { PageServerLoad } from './$types';

export const load = (async () => {
  return { scraps };
}) satisfies PageServerLoad;
