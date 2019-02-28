const json = require('../../Data/testingGamingModel');
const jsonQuestion = require('../../Data/testingQuestionModel');
const Question = require('../Model/Question');
const AnswerAlternative = require('../Model/AnswerAlternative');
const Template = require('../Graph/Template');

class QuestionDAO {
    constructor() {
    }

    static getQuestions(category, discipline, level) {
        console.log("CATEGORY", category, "DISCIPLINE", discipline, "LEVEL", level);
        let questions = [];
        let guideline = json;
        guideline.categories.map((c)=>{
            if (c.category === category)
                c.disciplines.map((d)=>{
                    if (d.discipline === discipline)
                        d.levels.map((l)=>{
                           if(l.level === level)
                               l.questions.map((q)=>{
                                   let question = new Question();
                                   question.setLevel(l.level);
                                   question.setDiscipline(d.discipline);
                                   question.setRequiredMinSkill(l.requiredMinSkill);
                                   question.setPassingCondition(l.passingCondition);

                                   question.setNarrative(jsonQuestion.questions[q.question].narrative);
                                   question.setAnswerKey(jsonQuestion.questions[q.question].answerKey);

                                   question.setAnswerAlternatives(this._getAnswerKeys(q));
                                   question.setAnswerExplanation(jsonQuestion.questions[q.question].explanation);

                                   questions.push(question);
                               })
                        });
                })
        });
        return questions;
    }
    static getQuestionsOLD(category, discipline, skill, ) {
        let questions = [];
        for (let i = 0; i < json.categories.length; i++)
            if (json.categories[i].category === category)
                for (let j = 0; j < json.categories[i].disciplines.length; j++)
                    if (json.categories[i].disciplines[j].discipline === discipline)
                        for (let k = 0; k < json.categories[i].disciplines[j].levels.length; k++) {
                            let jL = json.categories[i].disciplines[j].levels[k];
                            if (jL.requiredMinSkill <= skill)
                                for (let l = 0; l < jL.questions.length; l++) {
                                    let jQ = jL.questions[l];
                                    let question = new Question();
                                    question.setLevel(jL.level);
                                    question.setDiscipline(discipline);
                                    question.setRequiredMinSkill(jL.requiredMinSkill);

                                    let template = new Template();
                                    template.generateEntityGraph(jQ.entityInstance);
                                    question.setNarrative(template.transformTemplate(jsonQuestion.questions[jQ.question].narrative));
                                    question.setAnswerKey(template.transformTemplate(jsonQuestion.questions[jQ.question].answerKey));

                                    question.setAnswerAlternatives(this._getAnswerKeys(jQ));
                                    question.setAnswerExplanation(jsonQuestion.questions[jQ.question].explanation);

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