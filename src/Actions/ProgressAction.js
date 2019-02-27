import * as Actions from './ActionTypes';

export const showProgression = ()=> ({type: Actions.SHOW_PROGRESSION});
export const hideProgression = () => ({ type: Actions.HIDE_PROGRESSION });
export const getNewLevels = (scores) => ({type: Actions.GET_NEW_LEVELS, scores: scores});
export const nextLevelRequirements = (requirements) => ({type: Actions.NEXT_LEVEL_REQUIREMENTS, requirements: requirements});