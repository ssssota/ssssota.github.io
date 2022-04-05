// @ts-check
import TOML from '@iarna/toml';
import { createFilter, dataToEsm } from '@rollup/pluginutils';
import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

const tomlPlugin = (options = {}) => {
  const tomlExt = /\.toml$/;
  const filter = createFilter(options.include, options.exclude);
  return {
    name: 'toml',
    /**
     * @type {(content: string, id: string) => { code: string }}
     */
    transform: (content, id) => {
      if (!tomlExt.test(id) || !filter(id)) return null;
      return {
        code: dataToEsm(TOML.parse(content), {
          preferConst: true,
          objectShorthand: true,
        }),
      };
    },
  };
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter(),
    prerender: {
      default: true,
    },
    browser: {
      hydrate: false,
      router: false,
    },
    vite: {
      plugins: [tomlPlugin()],
      server: {
        fs: {
          allow: ['.'],
        },
      },
    },
  },
};

export default config;
