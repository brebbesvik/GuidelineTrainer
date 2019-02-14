import {AsyncStorage} from 'react-native';
class SkillDAO {
    constructor() {
    }
    static saveScores(category, skills) {
        let dict = {};
        for(let i=0; i<skills.length; i++) {
            dict[skills[i].getDiscipline()] = skills[i].getScore();
        }
        try {
            AsyncStorage.setItem(category, JSON.stringify(dict));
        }catch(error) {
            console.log("Error storing " + error);
        }
    }
    /*static getScore (category, discipline) {
        return AsyncStorage.getItem(category + discipline);
    }*/

}
module.exports = SkillDAO;