import Quiz from '../Model/Quiz';
import QuizDAO from "../DAO/QuizDAO";
import QuestionDAO from "../DAO/QuestionDAO";
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
        this._skills = {};
    }

    /*static addSkill(skill) {
        this._skills.push(skill);
    }*/

    static getDisciplines() {
        let disciplines = [];
        this._quiz.getDisciplines().map((discipline) => disciplines.push(discipline.getName()));
        return disciplines;
    }

    static setInitialScore() {
        let level;
        this._scores.map((score=>{
            level = this._quiz.getDiscipline(score.getDiscipline()).getAllowedLevel(this._skills[score.getDiscipline()]+1);
            if(level && level.getRequiredMinSkill()>0) {score.setScore((level.getRequiredMinSkill()));}
            else score.setScore(0);
        }));
    }

    // TODO: ADD LEVEL 3 in the JSON. NEED THE DATABASE TO NOT OVERWRITE COMPLETED LEVELS. WEIRD STUFF IS HAPPENING BECAUSE OF THE OVERWRITING
    static addQuestions() {
        console.log("SKILLS AT ADD QUESTION!", this._skills);
        if(this._skills["Assessment"] === 1 && this._skills["Diagnosis"] === 1 && this._skills["Management"] === 1) {
            this.getDisciplines().map((discipline)=>{
                if (this._skills[discipline] !== 2)
                    this._quiz.addQuestions(QuestionDAO.getQuestions("Asthma", discipline, 2));
            });
        }
        else {
            this.getDisciplines().map((discipline)=>{
                if (this._skills[discipline] !== 1)
                    this._quiz.addQuestions(QuestionDAO.getQuestions("Asthma", discipline, 1));
            });
        }
    }

    static getAllowedLevels(discipline) {
        let allowedLevels = [];
        this._quiz.getDiscipline(discipline).getAllowedLevels().map((level)=> {
            allowedLevels.push(level.getLevel());
        });
        return allowedLevels;
    }

    static getUnAllowedLevels(discipline) {
        let unAllowedLevel = [];
        this._quiz.getDiscipline(discipline).getUnAllowedLevels().map((level)=> {
            unAllowedLevel.push(level.getLevel());
        });
        return unAllowedLevel;
    }

    static getSkills() {
        return this._skills;
    }
    static setSkills(skills) {
        this._skills = skills;
    }

    static getScores() {
        return this._scores;
    }

    static getQuiz() {
        return this._quiz;
    }
}
module.exports = Game;