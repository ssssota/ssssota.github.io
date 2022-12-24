import { z } from 'zod';

const yearMonth = z.object({
  year: z.number(),
  month: z.number(),
});

export const Career = z.object({
  name: z.string(),
  from: yearMonth,
  to: z.optional(yearMonth),
  description: z.optional(z.string()),
  link: z.optional(z.string()),
});
export type Career = z.TypeOf<typeof Career>;

export const Skill = z.object({
  name: z.string(),
  description: z.optional(z.string()),
  value: z.number(),
});
export type Skill = z.TypeOf<typeof Skill>;

export const Work = z.object({
  name: z.string(),
  description: z.string(),
  link: z.string(),
});
export type Work = z.TypeOf<typeof Work>;

export const About = z.object({
  name: z.string(),
  nickname: z.optional(z.string()),
  github: z.optional(z.string()),
  twitter: z.optional(z.string()),
});
export type About = z.TypeOf<typeof About>;

export const Toml = z.object({
  about: About,
  careers: z.array(Career),
  skills: z.array(Skill),
  works: z.array(Work),
});
