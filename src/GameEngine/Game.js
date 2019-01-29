import Quiz from '../Model/Quiz';
import QuizDAO from "../DAO/QuizDAO";
import Skill from "../Model/Skill";
class Game {
    constructor() {
    }

    static _quiz = null;
    static _scores = null;
    static _skills = null;

    static createQuiz(category="Asthma") {
        this._quiz = new Quiz();
        this._quiz.setCategory(category);
        this._quiz.setDisciplines(QuizDAO.getDisciplines(category));

        this._scores = [];
        this._quiz.getDisciplines().map((discipline)=> {
            let score = new Skill();
            score.setDiscipline(discipline);
            this._scores.push(score);
        });

        this._skills = [];
        /*this._quiz.getDisciplines().map((discipline)=> {
            let skill = new Skill();
            skill.setDiscipline(discipline);
            this._skills.push(skill);
        });*/
    }
    static addSkill(skill) {
        this._skills.push(skill);
    }
    static getDisciplines() {
        return this._quiz.getDisciplines();
    }
    static addQuestions(questions) {
        this._quiz.addQuestions(questions);
    }
    static getAllowedLevels() {
        return this._quiz.getAllowedLevels();
    }
    static getSkills() {
        return this._skills;
    }
    static getScores() {
        return this._scores;
    }
    static getQuiz() {
        return this._quiz;
    }
}
module.exports = Game;