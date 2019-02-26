import * as Actions from './ActionTypes';

export const showProgression = ()=> ({type: Actions.SHOW_PROGRESSION});
export const hideProgression = () => ({ type: Actions.HIDE_PROGRESSION });
export const getNewLevels = (discipline, score) => ({type: Actions.GET_NEW_LEVELS, discipline: discipline, score: score});
export const nextLevelRequirements = (requirements) => ({type: Actions.NEXT_LEVEL_REQUIREMENTS, requirements: requirements});