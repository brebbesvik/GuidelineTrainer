import Quiz from '../Model/Quiz';
import QuizDAO from "../DAO/QuizDAO";
import Skill from "../Model/Skill";
import Discipline from "../Model/Discipline";
import Level from "../Model/Level";
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
            score.setDiscipline(discipline.getName());
            this._scores.push(score);
        });
        this._skills = [];
    }

    static addSkill(skill) {
        this._skills.push(skill);
    }

    static getDisciplines() {
        let disciplines = [];
        this._quiz.getDisciplines().map((discipline) => disciplines.push(discipline.getName()));
        return disciplines;
    }
    static addQuestions(questions) {
        this._quiz.addQuestions(questions);
    }

    static getAllowedLevels(discipline) {
        let allowedLevels = [];
        this._quiz.getDiscipline(discipline).getAllowedLevels().map((level)=> {allowedLevels.push(level.getLevel());});
        return allowedLevels;
    }

    static getUnAllowedLevels(discipline) {
        let unAllowedLevel = [];
        this._quiz.getDiscipline(discipline).getUnAllowedLevels().map((level)=> {unAllowedLevel.push(level.getLevel())});
        return unAllowedLevel;
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