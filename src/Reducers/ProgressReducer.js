import * as Actions from '../Actions/ActionTypes'
import QuizDAO from "../DAO/QuizDAO";
import Game from "../GameEngine/Game";

const initialState = {
    progression: false,
    newLevels: ''
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
        case Actions.GET_NEW_LEVELS:
            let newLevels = [];
            action.scores.map((score)=>{
                let allowedLevels = [];
                QuizDAO.getAllowedLevels("Asthma", score.getDiscipline(), score.getScore()).map((level)=>{
                    allowedLevels.push(level.getLevel());
                });
                newLevels[score.getDiscipline()] = allowedLevels;
            });
            return Object.assign({}, state, {
                newLevels: newLevels
            });
        case Actions.NEXT_LEVEL_REQUIREMENTS:
            let requirements = {};
            Game.getQuiz().getDisciplines().map((discipline)=>{
                let score= 0;
                let index= 0;
                for (let i=0; i<discipline.getUnAllowedLevels().length; i++ ) {
                    if (score < discipline.getUnAllowedLevels()[i].getRequiredMinSkill()) {
                        score = discipline.getUnAllowedLevels()[i].getRequiredMinSkill();
                        index = i;
                    }
                }
                requirements[discipline.getName()] = score;
            });
            return Object.assign({}, state, {
                requirements: requirements
            });


        default:
            return state;
    }
};

export default ProgressReducer;