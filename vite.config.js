import { sveltekit } from '@sveltejs/kit/vite';
import TOML from '@iarna/toml';
import { createFilter, dataToEsm } from '@rollup/pluginutils';

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

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [tomlPlugin(), sveltekit()],
};

export default config;
