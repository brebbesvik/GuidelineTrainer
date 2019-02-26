import Game from '../GameEngine/Game';
import * as Actions from '../Actions/ActionTypes'
import QuizDAO from "../DAO/QuizDAO";

const initialState = {
    disciplines: Game.getDisciplines(),
    lockedLevels: "",
    unlockedLevels: "",

};
const DisciplineReducer = (state, action) => {
    if (typeof state === 'undefined') {
        return initialState;
    }
    switch (action.type) {
        case 'GET_UNLOCKED_LEVELS':
            return Object.assign({}, state, {
                unlockedLevels: action.unlockedLevels,
            });
        case 'GET_LOCKED_LEVELS':
            return Object.assign({}, state, {
                lockedLevels: action.lockedLevels,
            });
        default:
            return state;
    }
};

export default DisciplineReducer;