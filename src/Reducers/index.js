import { combineReducers, createStore } from 'redux';

import counterReducer from './CounterReducer'
import answerKeyReducer from './AnswerKeyReducer'

const AppReducers = combineReducers({
    counterReducer,
    answerKeyReducer
});

const rootReducer = (state, action) => {
    return AppReducers(state,action);
}

let store = createStore(rootReducer);

export default store;