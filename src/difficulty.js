import {catalogs,record} from './master-data.js';
export const difficulties=catalogs.Difficulty;
export const DEFAULT_DIFFICULTY='DIF_NORMAL';
export const validDifficulty=id=>difficulties.some(d=>d.id===id);
export const difficultyOf=s=>record(validDifficulty(s?.difficulty)?s.difficulty:DEFAULT_DIFFICULTY);
export const expenseFactor=s=>difficultyOf(s).expenseMultiplier;
export const incomeFactor=s=>difficultyOf(s).incomeMultiplier;
