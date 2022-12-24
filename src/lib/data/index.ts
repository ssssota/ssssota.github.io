import Data from '../../data.toml';
import { Toml } from './types';

export type { About, Career, Skill, Work } from './types';

const data = Toml.parse(Data);
export const { about, careers, skills, works } = data;
export default data;
