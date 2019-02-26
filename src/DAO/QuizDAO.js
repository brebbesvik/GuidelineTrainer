const json = require('../../Data/testingGamingModel');
const Quiz = require('../Model/Quiz');
const QuestionDAO = require('./QuestionDAO');
const Discipline = require('../Model/Discipline');
const Level = require('../Model/Level');


class QuizDAO {
    constructor() {
    }

/*    static getCategories () {
        let categories = [];
        for (let i = 0; i < json.categories.length; i++)
            categories.push(json.categories[i].category);
        return categories;
    }
*/
    static getDisciplines(category) {
        let disciplines = [];
        for (let i = 0; i < json.categories.length; i++)
            if (json.categories[i].category === category)
                for (let j = 0; j < json.categories[i].disciplines.length; j++) {
                    disciplines.push(new Discipline(json.categories[i].disciplines[j].discipline));
                }

        return disciplines;
    }
/*
    static getLevels(category, discipline) {
        let levels = [];
        for (let i = 0; i < json.categories.length; i++)
            if (json.categories[i].category === category)
                for (let j = 0; j < json.categories[i].disciplines.length; j++)
                    if (json.categories[i].disciplines[j].discipline === discipline)
                        for (let k = 0; k < json.categories[i].disciplines[j].levels.length; k++)
                            levels.push(json.categories[i].disciplines[j].levels[k].level);
        return levels;
    }
*/
    static getAllowedLevels(category, discipline, skill) {
        let levels = [];
        for (let i = 0; i < json.categories.length; i++)
            if (json.categories[i].category === category)
                for (let j = 0; j < json.categories[i].disciplines.length; j++)
                    if (json.categories[i].disciplines[j].discipline === discipline)
                        for (let k = 0; k < json.categories[i].disciplines[j].levels.length; k++)
                            if (json.categories[i].disciplines[j].levels[k].requiredMinSkill <= skill) {
                                let level = new Level();
                                level.setLevel(json.categories[i].disciplines[j].levels[k].level);
                                level.setPassingCondition(json.categories[i].disciplines[j].levels[k].passingCondition);
                                level.setRequiredMinSkill(json.categories[i].disciplines[j].levels[k].requiredMinSkill);
                                levels.push(level);
                            }
        return levels;
    }




    static getUnAllowedLevels(category, discipline, skill) {
        let levels = [];
        for (let i = 0; i < json.categories.length; i++)
            if (json.categories[i].category === category)
                for (let j = 0; j < json.categories[i].disciplines.length; j++)
                    if (json.categories[i].disciplines[j].discipline === discipline)
                        for (let k = 0; k < json.categories[i].disciplines[j].levels.length; k++)
                            if (json.categories[i].disciplines[j].levels[k].requiredMinSkill > skill) {
                                let level = new Level();
                                level.setLevel(json.categories[i].disciplines[j].levels[k].level);
                                level.setPassingCondition(json.categories[i].disciplines[j].levels[k].passingCondition);
                                level.setRequiredMinSkill(json.categories[i].disciplines[j].levels[k].requiredMinSkill);
                                levels.push(level);
                            }
        return levels;
    }






}
module.exports = QuizDAO;