import * as Actions from '../Actions/ActionTypes';
import QuizDAO from '../DAO/QuizDAO';
import SkillDAO from '../DAO/SkillDAO';

const disciplines = QuizDAO.getDisciplines("Asthma");
const allLevels = [];
for (let i=0; i<disciplines.length; i++) {
    SkillDAO.getScore("Asthma", disciplines[i]).then((value)=> {
        allLevels[disciplines[i]] = (QuizDAO.getAllowedLevels("Asthma", disciplines[i], value));
    }).catch(allLevels[disciplines[i]] = 0);

}

const initialState = {
    disciplines: disciplines,
    allLevels: allLevels,
    unlockedLevels: [1],
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