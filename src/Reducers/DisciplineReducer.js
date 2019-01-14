import * as Actions from '../Actions/ActionTypes';
import QuizDAO from '../DAO/QuizDAO';

const disciplines = QuizDAO.getDisciplines("Asthma");
const allLevels = [];
for (let i=0; i<disciplines.length; i++)
    allLevels.push(QuizDAO.getLevels("Asthma", disciplines[i]));

const initialState = {
    disciplines: disciplines,
    allLevels: allLevels,
    unlockedLevels: [1]
};
const DisciplineReducer = (state, action) => {
    if (typeof state === 'undefined') {
        return initialState;
    }
    switch (action.type) {
        default:
            return state;
    }
};

export default DisciplineReducer;