// @ts-check
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';
import * as fs from 'node:fs/promises';
/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter(),
    prerender: {
      entries: ['*', ...(await getArticlePathList())],
    },
  },
};

async function getArticlePathList() {
  const articles = await fs.readFile('./src/lib/data/articles.json', 'utf8');
  return JSON.parse(articles).map(({ slug }) => {
    /** @type {`/${string}`} */
    const path = `/articles/${slug}`;
    return path;
  });
}
export default config;
