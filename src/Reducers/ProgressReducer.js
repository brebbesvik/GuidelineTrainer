import * as Actions from '../Actions/ActionTypes'

const initialState = {
    progression: false
};
const ProgressReducer = (state, action) => {
    if (typeof state === 'undefined') {
        return initialState;
    }
    switch (action.type) {
        case Actions.SHOW_PROGRESSION:
            return Object.assign({}, state, {
                progression: true
            });
        case Actions.HIDE_PROGRESSION:
            return Object.assign({}, state, {
                progression: false
            });
        default:
            return state;
    }
};

export default ProgressReducer;