import * as Actions from '../Actions/ActionTypes'
import * as Asthma from '../getting_data_from_json'

const initialState = {
    count: 5,
    problem: Asthma.get_description()
};
const CounterReducer = (state, action) => {
    if (typeof state === 'undefined') {
        return initialState;
    }
    switch (action.type) {
        case Actions.COUNTER_INCREMENT:
            return Object.assign({}, state, {
                count: state.count + 1
            });
        case Actions.COUNTER_DECREMENT:
            return Object.assign({}, state, {
                count: state.count - 1
            });
        default:
            return state;
    }
}

export default CounterReducer;