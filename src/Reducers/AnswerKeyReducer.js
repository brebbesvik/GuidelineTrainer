import * as Actions from '../Actions/ActionTypes'

const initialState = {
    answerKey: true
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
        default:
            return state;
    }
};

export default AnswerKeyReducer;