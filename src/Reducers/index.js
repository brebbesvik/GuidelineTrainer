import { combineReducers, createStore } from 'redux';

import counterReducer from './CounterReducer'
import answerKeyReducer from './AnswerKeyReducer'
import summaryReducer from './SummaryReducer'
import disciplineReducer from './DisciplineReducer'

const AppReducers = combineReducers({
    counterReducer,
    answerKeyReducer,
    summaryReducer,
    disciplineReducer
});

const rootReducer = (state, action) => {
    return AppReducers(state,action);
}

let store = createStore(rootReducer);

export default store;