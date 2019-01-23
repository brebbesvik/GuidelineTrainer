import Quiz from '../Model/Quiz';
import QuizDAO from "../DAO/QuizDAO";
import SkillDAO from "../DAO/SkillDAO";
import QuestionDAO from "../DAO/QuestionDAO";
import Skill from "../Model/Skill";
class Game {
    constructor() {
    }

    static _quiz = null;
    static _scores = null;
    static _skills = null;

    static createQuiz(category) {
        this._quiz = new Quiz();
        this._quiz.setCategory(category);
        this._quiz.setDisciplines(QuizDAO.getDisciplines(category));

        for (let i=0; i<this._quiz.getDisciplines().length; i++) {
            SkillDAO.getScore("Asthma", this._quiz.getDisciplines()[i]).then((skill) => {
                // Get Levels which are allowed to play
                this._quiz.addAllowedLevels(this._quiz.getDisciplines()[i],  QuizDAO.getAllowedLevels(category, this._quiz.getDisciplines()[i], skill));
                // Get questions which are allowed to play
                this._quiz.addQuestions(QuestionDAO.getQuestions(category, this._quiz.getDisciplines()[i], skill));
                console.log("Reducer: " + this._quiz.getAllowedLevels([this._quiz.getDisciplines()[i]]));
                console.log("Questions: " + this._quiz._questions);
            }).catch(this._quiz.addAllowedLevels([this._quiz.getDisciplines()[i]], 0));
        }

        this._scores = [];
        this._quiz.getDisciplines().map((discipline)=> {
            let score = new Skill();
            score.setDiscipline(discipline);
            this._scores.push(score);
        });

        this._skills = [];
        this._quiz.getDisciplines().map((discipline)=> {
            let skill = new Skill();
            skill.setDiscipline(discipline);
            this._skills.push(skill);
        });
    }
    static getDisciplines() {
        return this._quiz.getDisciplines();
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