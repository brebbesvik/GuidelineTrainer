import {AsyncStorage} from 'react-native';
import Skill from '../Model/Skill';
class SkillDAO {
    constructor() {
        this._skills = [];
    }
    getSkills() {
        console.log(this._skills);
        return this._skills;
    }
    static saveScores(category, skills) {
        for(let i=0; i<skills.length; i++)
            this.saveScore(category, skills[i]);
    }
    static saveScore(category, skill) {
        try {
            AsyncStorage.setItem(category + skill.getDiscipline(), skill.getScore().toString());
        }catch(error) {
            console.log("Error storing " + error);
        }
    }


    static getScore (category, discipline) {
        return AsyncStorage.getItem(category + discipline);
        /*.then((value)=>{
                console.log(value);
                score.setScore(parseFloat(value));
                this._skills.push(score);
            });
            console.log("1 " + score.getScore());
        }catch(error) {
            console.log("Error retrieving: " + error);
        }
        console.log("2 " + score.getScore());
        return score;*/
    }

}
module.exports = SkillDAO;