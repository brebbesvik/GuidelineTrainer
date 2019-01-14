const json = require('../../Data/gamingModel');
const Quiz = require('../Model/Quiz');
const QuestionDAO = require('./QuestionDAO');


class QuizDAO {
    constructor() {
    }

    static getCategories () {
        let categories = [];
        for (let i = 0; i < json.categories.length; i++)
            categories.push(json.categories[i].category);
        return categories;
    }

    static getDisciplines(category) {
        let disciplines = [];
        for (let i = 0; i < json.categories.length; i++)
            if (json.categories[i].category === category)
                for (let j = 0; j < json.categories[i].disciplines.length; j++)
                    disciplines.push(json.categories[i].disciplines[j].discipline);
        return disciplines;
    }

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

    static getAllowedLevels(category, discipline, skill) {
        let levels = [];
        for (let i = 0; i < json.categories.length; i++)
            if (json.categories[i].category === category)
                for (let j = 0; j < json.categories[i].disciplines.length; j++)
                    if (json.categories[i].disciplines[j].discipline === discipline)
                        for (let k = 0; k < json.categories[i].disciplines[j].levels.length; k++)
                            if (json.categories[i].disciplines[j].levels[k].requiredMinSkill < skill)
                                levels.push(json.categories[i].disciplines[j].levels[k].level);
        return levels;
    }






}
module.exports = QuizDAO;