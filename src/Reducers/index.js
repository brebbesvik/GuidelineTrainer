import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

import { combineReducers } from 'redux';

import counterReducer from './CounterReducer'
import answerKeyReducer from './AnswerKeyReducer'
import summaryReducer from './SummaryReducer'
import disciplineReducer from './DisciplineReducer'
import progressReducer from './ProgressReducer'
import {getUnlockedLevels, getLockedLevels, initializeQuiz} from "../Actions/ActionThunks";

const AppReducers = combineReducers({
    counterReducer,
    answerKeyReducer,
    summaryReducer,
    disciplineReducer,
    progressReducer,
});

const rootReducer = (state, action) => {
    return AppReducers(state,action);
};

let store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware // lets us dispatch() functions
    )
);

store.dispatch(getUnlockedLevels());
store.dispatch(getLockedLevels());
store.dispatch(initializeQuiz());

export default store;