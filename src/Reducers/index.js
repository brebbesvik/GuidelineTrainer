import { combineReducers, createStore } from 'redux';

import counterReducer from './CounterReducer'
import answerKeyReducer from './AnswerKeyReducer'
import summaryReducer from './SummaryReducer'

const AppReducers = combineReducers({
    counterReducer,
    answerKeyReducer,
    summaryReducer
});

const rootReducer = (state, action) => {
    return AppReducers(state,action);
}

let store = createStore(rootReducer);

export default store;