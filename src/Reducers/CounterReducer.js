import * as Actions from '../Actions/ActionTypes';
import QuizDAO from '../DAO/QuizDAO';
import QuestionDAO from '../DAO/QuestionDAO';
import Quiz from '../Model/Quiz';
import Skill from '../Model/Skill';
import SkillDAO from '../DAO/SkillDAO';


const quiz = new Quiz();
quiz.setCategory("Asthma");

const disciplines = QuizDAO.getDisciplines("Asthma");

disciplines.map((discipline)=>quiz.addQuestions(QuestionDAO.getQuestions("Asthma", discipline, 1)));

const scores = [];
disciplines.map((discipline)=> {
    let score = new Skill();
    score.setDiscipline(discipline);
    scores.push(score);
});

const skills = [];
disciplines.map((discipline)=> {
    let skill = new Skill();
    skill.setDiscipline(discipline);
    skills.push(skill);
});

const initialState = {
    scores: scores,
    discipline: quiz.getQuestion().getDiscipline(),
    problem: quiz.getQuestion().getNarrative(),
    alternatives: quiz.getQuestion().getAnswerAlternatives(),
    correctAlternative: quiz.getQuestion().getAnswerKeyIndex(),
    questionNumber: quiz.getQuestionNumber(),
    numberOfQuestions: quiz.getNumberOfQuestions(),
    answerKeyExplanation: quiz.getQuestion().getAnswerExplanation(),
    skills: skills
};

const CounterReducer = (state, action) => {
    if (typeof state === 'undefined') {
        return initialState;
    }
    switch (action.type) {
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
            quiz.increaseQuestionNumber();
            return Object.assign({}, state, {
                discipline: quiz.getQuestion().getDiscipline(),
                problem: quiz.getQuestion().getNarrative(),
                alternatives: quiz.getQuestion().getAnswerAlternatives(),
                correctAlternative: quiz.getQuestion().getAnswerKeyIndex(),
                questionNumber: quiz.getQuestionNumber(),
                answerKeyExplanation: quiz.getQuestion().getAnswerExplanation()
            });
        case Actions.RESET_QUIZ:
            state.scores.map((score)=> {
                score.setScore(0);
            });
            quiz.reset();
            return initialState;
        case Actions.STORE_SCORES:
            SkillDAO.saveScores(quiz.getCategory(), state.scores);
            return state;
        default:
            return state;
    }
};

export default CounterReducer;