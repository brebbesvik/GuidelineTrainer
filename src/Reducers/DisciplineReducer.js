import QuizDAO from '../DAO/QuizDAO';


const initialState = {
    disciplines: QuizDAO.getDisciplines("Asthma"),
    allLevels: "",
    unlockedLevels: [1],
};
const DisciplineReducer = (state, action) => {
    if (typeof state === 'undefined') {
        return initialState;
    }
    switch (action.type) {
        case 'GET_UNLOCKED_LEVELS':
            return Object.assign({}, state, {
                allLevels: action.allLevels,
            });
        default:
            return state;
    }
};

export default DisciplineReducer;