import * as Actions from './ActionTypes';

export const showAnswerKey = () => ({ type: Actions.SHOW_ANSWER_KEY });
export const hideAnswerKey = () => ({ type: Actions.HIDE_ANSWER_KEY });
export const setAnswerCorrect = () => ({ type: Actions.CORRECT_ANSWER });
export const setAnswerWrong = () => ({ type: Actions.WRONG_ANSWER });


