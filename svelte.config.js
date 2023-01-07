// @ts-check
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';
import articles from './src/lib/articles.json' assert { type: 'json' };
/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter(),
    prerender: {
      entries: ['*', ...getArticlePathList()],
    },
  },
};

function getArticlePathList() {
  return articles.map(({ slug }) => {
    /** @type {`/${string}`} */
    const path = `/articles/${slug}`;
    return path;
  });
}
export default config;
