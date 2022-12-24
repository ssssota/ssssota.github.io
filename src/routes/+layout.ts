import type { LayoutLoad } from '@sveltejs/kit';
export const load: LayoutLoad = () => ({ renderedAt: new Date().toISOString().substring(0, 10) });
