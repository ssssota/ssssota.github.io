import TOML from '@iarna/toml';
import type { FilterPattern } from '@rollup/pluginutils';
import { createFilter, dataToEsm } from '@rollup/pluginutils';
import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const tomlPlugin = (
  options: {
    include?: FilterPattern;
    exclude?: FilterPattern;
  } = {},
) => {
  const tomlExt = /\.toml$/;
  const filter = createFilter(options.include, options.exclude);
  return {
    name: 'toml',
    transform: (content: string, id: string) => {
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

export default {
  plugins: [tomlPlugin(), sveltekit()],
} satisfies UserConfig;
