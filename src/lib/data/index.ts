import Data from '../../data.toml';
import { Toml } from './types';
import { validation } from './utils';

export type { About, Career, Skill, Work } from './types';

const data = validation(Toml, Data);
export const { about, careers, skills, works } = data;
export default data;
