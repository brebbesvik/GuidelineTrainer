import * as Actions from './ActionTypes';

export const setReward = (reward) => ({type: Actions.SET_REWARD, reward: reward});
export const updateScore = () => ({type: Actions.UPDATE_SCORE});
export const nextQuestion = () => ({type: Actions.NEXT_QUESTION});
export const resetQuiz = () => ({type: Actions.RESET_QUIZ});



