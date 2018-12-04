import * as Actions from '../Actions/ActionTypes'

const initialState = {
    summary: false
};
const SummaryReducer = (state, action) => {
    if (typeof state === 'undefined') {
        return initialState;
    }
    switch (action.type) {
        case Actions.SHOW_SUMMARY:
            return Object.assign({}, state, {
                summary: true
            });
        case Actions.HIDE_SUMMARY:
            return Object.assign({}, state, {
                summary: false
            });
        default:
            return state;
    }
};

export default SummaryReducer;