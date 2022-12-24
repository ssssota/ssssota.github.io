import type { Load } from '@sveltejs/kit';
export const load: Load = () => ({
  renderedAt: new Date().toISOString().substring(0, 10),
});

export const prerender = true;
