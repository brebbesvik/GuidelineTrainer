const json = require('../../Data/gamingModel');
const Question = require('../Model/Question');
const AnswerAlternative = require('../Model/AnswerAlternative');
const Template = require('../Graph/Template');

class QuestionDAO {
    constructor() {
    }
    static getQuestions(category, discipline, skill, ) {
        let questions = [];
        for (let i = 0; i < json.categories.length; i++)
            if (json.categories[i].category === category)
                for (let j = 0; j < json.categories[i].disciplines.length; j++)
                    if (json.categories[i].disciplines[j].discipline === discipline)
                        for (let k = 0; k < json.categories[i].disciplines[j].levels.length; k++) {
                            let jL = json.categories[i].disciplines[j].levels[k];
                            if (jL.requiredMinSkill < skill)
                                for (let l = 0; l < jL.questions.length; l++) {
                                    let jQ = jL.questions[l];
                                    let question = new Question();
                                    question.setLevel(jL.level);
                                    question.setDiscipline(discipline);
                                    question.setRequiredMinSkill(jL.requiredMinSkill);

                                    let template = new Template();
                                    template.generateEntityGraph(jQ.entityInstance);
                                    question.setNarrative(template.transformTemplate(jQ.narrative));
                                    question.setAnswerKey(template.transformTemplate(jQ.answerKey));

                                    question.setAnswerAlternatives(this._getAnswerKeys(jQ));
                                    question.setAnswerExplanation(jQ.explanation);

                                    questions.push(question);
                                }
                        }
        return questions;
    }
    static _getAnswerKeys(question) {
        let answerAlternatives = [];
        for (let i=0; i<question.answerAlternatives.length; i++) {
            let answerAlternative = new AnswerAlternative();
            answerAlternative.setAlternative(question.answerAlternatives[i].alternative);
            answerAlternative.setReward(question.answerAlternatives[i].reward);
            answerAlternatives.push(answerAlternative);
        }
        return answerAlternatives;
    }
}
module.exports = QuestionDAO;