import * as Actions from '../Actions/ActionTypes'

const initialState = {
    answerKey: true,
    isAnswerCorrect: false
};
const AnswerKeyReducer = (state, action) => {
    if (typeof state === 'undefined') {
        return initialState;
    }
    switch (action.type) {
        case Actions.SHOW_ANSWER_KEY:
            return Object.assign({}, state, {
                answerKey: true
            });
        case Actions.HIDE_ANSWER_KEY:
            return Object.assign({}, state, {
                answerKey: false
            });
        case Actions.CORRECT_ANSWER:
            return Object.assign({}, state, {
                isAnswerCorrect: true
            });
        case Actions.WRONG_ANSWER:
            return Object.assign({}, state, {
                isAnswerCorrect: false
            });
        default:
            return state;
    }
};

export default AnswerKeyReducer;