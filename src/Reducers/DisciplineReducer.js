import QuizDAO from '../DAO/QuizDAO';


const initialState = {
    disciplines: QuizDAO.getDisciplines("Asthma"),
    allLevels: "",
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
        default:
            return state;
    }
};

export default DisciplineReducer;