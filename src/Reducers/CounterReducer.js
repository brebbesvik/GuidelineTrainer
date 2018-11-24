import * as Actions from '../Actions/ActionTypes'
import * as Asthma from '../getting_data_from_json'
import QuestionMocks from '../MockingData/QuestionMocks';
import PropTypes from 'prop-types';

const questionMocks = new QuestionMocks();
questionMocks.generate();

/*const initialState = {
    count: 5,
    problem: Asthma.get_description(),
    alternatives: Asthma.get_alternatives()
};*/

const initialState = {
    count: 5,
    problem: questionMocks.getQuestion(),
    alternatives: questionMocks.getAlternatives(),
    correctAlternative: questionMocks.getAnswerKey(),
    questionNumber: questionMocks.getQuestionNumber(),
    numberOfQuestions: questionMocks.getNumberOfQuestions()
};

const CounterReducer = (state, action) => {
    if (typeof state === 'undefined') {
        return initialState;
    }
    switch (action.type) {
        case Actions.COUNTER_INCREMENT:
            return Object.assign({}, state, {
                count: state.count + 1,
            });
        case Actions.COUNTER_DECREMENT:
            return Object.assign({}, state, {
                count: state.count - 1
            });
        case Actions.NEXT_QUESTION:
            questionMocks.increaseQuestionNumber();
            return Object.assign({}, state, {
                problem: questionMocks.getQuestion(),
                alternatives: questionMocks.getAlternatives(),
                correctAlternative: questionMocks.getAnswerKey(),
                questionNumber: questionMocks.getQuestionNumber()
            });
        default:
            return state;
    }
};

export default CounterReducer;