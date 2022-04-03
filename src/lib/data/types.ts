import * as t from 'io-ts';

const optional = <T extends t.Mixed>(type: T) => t.union([type, t.undefined]);

const yearMonth = t.type({
  year: t.number,
  month: t.number,
});

export const Career = t.type({
  name: t.string,
  from: yearMonth,
  to: optional(yearMonth),
  description: optional(t.string),
  link: optional(t.string),
});
export type Career = t.TypeOf<typeof Career>;

export const Skill = t.type({
  name: t.string,
  description: optional(t.string),
  value: t.number,
});
export type Skill = t.TypeOf<typeof Skill>;

export const Work = t.type({
  name: t.string,
  description: t.string,
  link: t.string,
});
export type Work = t.TypeOf<typeof Work>;

export const About = t.type({
  name: t.string,
  nickname: optional(t.string),
  github: optional(t.string),
  twitter: optional(t.string),
});
export type About = t.TypeOf<typeof About>;

export const Toml = t.type({
  about: About,
  careers: t.array(Career),
  skills: t.array(Skill),
  works: t.array(Work),
});
