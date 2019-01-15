import * as Actions from '../Actions/ActionTypes';
import QuestionMocks from '../MockingData/QuestionMocks';
//import QuizDAO from '../DAO/QuizDAO';
import QuestionDAO from '../DAO/QuestionDAO';
import Quiz from '../Model/Quiz';

const quiz = new Quiz();
quiz.setCategory("Asthma");
quiz.addQuestions(QuestionDAO.getQuestions("Asthma", "Examination", 1));

/*const initialState = {
  count: 5,
  problem: quiz.getQuestion().getNarrative(),
  alternatives: ["LOL", "ROFL", "LMAO"],
  correctAlternative: quiz.getQuestion().getAnswerKey(),
  questionNumber: quiz.getQuestionNumber(),
  numberOfQuestions: quiz.getNumberOfQuestions(),
  answerKeyExplanation: quiz.getQuestion().getAnswerExplanation()
};
*/
const questionMocks = new QuestionMocks();
questionMocks.generate();

const initialState = {
    count: 5,
    problem: quiz.getQuestion().getNarrative(),
    alternatives: quiz.getQuestion().getAnswerAlternatives(),
    correctAlternative: quiz.getQuestion().getAnswerKeyIndex(),
    questionNumber: quiz.getQuestionNumber(),
    numberOfQuestions: quiz.getNumberOfQuestions(),
    answerKeyExplanation: quiz.getQuestion().getAnswerExplanation()
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
        case Actions.SET_REWARD:
            return Object.assign({}, state, {
                reward: action.reward
            });
        case Actions.UPDATE_SCORE:
            return Object.assign({}, state, {
                count: state.count + state.reward
            });
        case Actions.NEXT_QUESTION:
            quiz.increaseQuestionNumber();
            return Object.assign({}, state, {
                problem: quiz.getQuestion().getNarrative(),
                alternatives: quiz.getQuestion().getAnswerAlternatives(),
                correctAlternative: quiz.getQuestion().getAnswerKeyIndex(),
                questionNumber: quiz.getQuestionNumber(),
                answerKeyExplanation: quiz.getQuestion().getAnswerExplanation()
            });
        case Actions.RESET_QUIZ:
            quiz.reset();
            return initialState;
        default:
            return state;
    }
};

export default CounterReducer;