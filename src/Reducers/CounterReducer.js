import * as Actions from '../Actions/ActionTypes';
import SkillDAO from '../DAO/SkillDAO';
import Game from '../GameEngine/Game';

Game.createQuiz("Asthma");

const initialState = {
    scores: Game.getScores(),
    discipline: "",
    problem: "",
    alternatives: "",
    correctAlternative: "",
    questionNumber: "",
    numberOfQuestions: "",
    answerKeyExplanation: "",
    skills: Game.getSkills()
};

const CounterReducer = (state, action) => {
    if (typeof state === 'undefined') {
        return initialState;
    }
    switch (action.type) {
        case 'INITIALIZE_QUIZ':
            return Object.assign({}, state, {
                discipline: action.discipline,
                problem: action.problem,
                alternatives: action.alternatives,
                correctAlternative: action.correctAlternative,
                questionNumber: action.questionNumber,
                numberOfQuestions: action.numberOfQuestions,
                answerKeyExplanation: action.answerKeyExplanation
            });
        case Actions.SET_REWARD:
            return Object.assign({}, state, {
                reward: action.reward
            });
        case Actions.UPDATE_SCORE:
            let index = -1;
            for (let i=0; i<state.scores.length; i++) {
                if (state.scores[i].getDiscipline() === action.discipline)
                    index = i;
            }
            state.scores[index].addReward(state.reward);
            return Object.assign({}, state, {
                scores: state.scores
            });
        case Actions.NEXT_QUESTION:
            Game.getQuiz().increaseQuestionNumber();
            return Object.assign({}, state, {
                discipline: Game.getQuiz().getQuestion().getDiscipline(),
                problem: Game.getQuiz().getQuestion().getNarrative(),
                alternatives: Game.getQuiz().getQuestion().getAnswerAlternatives(),
                correctAlternative: Game.getQuiz().getQuestion().getAnswerKeyIndex(),
                questionNumber: Game.getQuiz().getQuestionNumber(),
                answerKeyExplanation: Game.getQuiz().getQuestion().getAnswerExplanation()
            });
        case Actions.RESET_QUIZ:
            state.scores.map((score)=> {
                score.setScore(0);
            });
            Game.getQuiz().reset();
            return Object.assign({}, state, {
            discipline: Game.getQuiz().getQuestion().getDiscipline(),
            problem: Game.getQuiz().getQuestion().getNarrative(),
            alternatives: Game.getQuiz().getQuestion().getAnswerAlternatives(),
            correctAlternative: Game.getQuiz().getQuestion().getAnswerKeyIndex(),
            questionNumber: Game.getQuiz().getQuestionNumber(),
            answerKeyExplanation: Game.getQuiz().getQuestion().getAnswerExplanation()
        });
        case Actions.STORE_SCORES:
            SkillDAO.saveScores(Game.getQuiz().getCategory(), state.scores);
            return state;
        default:
            return state;
    }
};

export default CounterReducer;