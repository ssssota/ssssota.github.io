import type { Mixed, TypeOf } from 'io-ts';

export const validation = <T extends Mixed>(t: T, data: unknown): TypeOf<T> => {
  const valid = t.decode(data);
  if (valid._tag === 'Left')
    throw new Error(
      `Unexpected type error\n${valid.left
        .map((e) => `⚠ ${JSON.stringify(e.value)}: ${e.message}`)
        .join('\n')}`
    );
  return valid.right;
};
