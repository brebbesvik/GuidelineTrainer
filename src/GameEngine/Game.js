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
            if(level && level.getRequiredMinSkill()>0) {
                score.setScore((level.getRequiredMinSkill()));
            }
            else if (this._skills["Assessment"] === 3 && this._skills["Diagnosis"] === 3 && this._skills["Management"] === 3 && this._skills["Follow-up"] === 3) {
                score.setScore(0);
            }
            else if (this._quiz.getDiscipline(score.getDiscipline()).getAllowedLevels().length > 2  && score.getDiscipline() === "Assessment") {
                score.setScore(80);

            }
            else if (this._quiz.getDiscipline(score.getDiscipline()).getAllowedLevels().length > 2  && score.getDiscipline() === "Diagnosis") {
                score.setScore(90);

            }
            else if (this._quiz.getDiscipline(score.getDiscipline()).getAllowedLevels().length > 2  && score.getDiscipline() === "Management") {
                score.setScore(70);

            }
            else if(this._quiz.getDiscipline("Follow-up").getAllowedLevels().length > 1 && score.getDiscipline() === 'Follow-up') {
                score.setScore(60);
            }
            else {
                score.setScore(0);
            }
        }));
        console.log("SCORES:", this._scores);
    }

    static orderQuestions() {
        let assessment = [];
        let diagnosis = [];
        let management = [];
        let followup = [];
        this._quiz.getQuestions().map((question)=>{
            if (question.getDiscipline() === 'Assessment')
                assessment.push(question);
            else if (question.getDiscipline() === 'Diagnosis')
                diagnosis.push(question);
            else if (question.getDiscipline() === 'Management')
                management.push(question);
            else if (question.getDiscipline() === 'Follow-up')
                followup.push(question);
        });
        let length = Math.max(assessment.length, diagnosis.length, management.length, followup.length);
        let questions = [];
        for (let i=0; i<length; i++) {
            if(assessment[i])
                questions.push(assessment[i]);
            if(diagnosis[i])
                questions.push(diagnosis[i]);
            if(management[i])
                questions.push(management[i]);
            if(followup[i])
                questions.push(followup[i]);
        }

        //console.log(questions);
        this._quiz.setQuestions(questions);

    }

    // TODO: ADD LEVEL 3 in the JSON. NEED THE DATABASE TO NOT OVERWRITE COMPLETED LEVELS. WEIRD STUFF IS HAPPENING BECAUSE OF THE OVERWRITING
    static addQuestions() {
        console.log("SKILLS AT ADD QUESTION!", this._skills);

        // COMPLETED start over again
        if(this._skills["Assessment"] === 3 && this._skills["Diagnosis"] === 3 && this._skills["Management"] === 3 && this._skills["Follow-up"] === 3) {
            this.getDisciplines().map((discipline)=>{
                    this._quiz.addQuestions(QuestionDAO.getQuestions("Asthma", discipline, 1));
            });
        }
        // LEVEL 3
        else if(this._skills["Assessment"] >= 2 && this._skills["Diagnosis"] >= 2 && this._skills["Management"] >= 2 && this._skills["Follow-up"] >= 2) {
            this.getDisciplines().map((discipline)=>{
                if (this._skills[discipline] !== 3)
                    this._quiz.addQuestions(QuestionDAO.getQuestions("Asthma", discipline, 3));
            });
        }
        // LEVEL 2
        else if(this._skills["Assessment"] >= 1 && this._skills["Diagnosis"] >= 1 && this._skills["Management"] >= 1 && this._skills["Follow-up"] >= 1) {
            this.getDisciplines().map((discipline)=>{
                if (this._skills[discipline] !== 2 && this._skills[discipline] !== 3)
                    this._quiz.addQuestions(QuestionDAO.getQuestions("Asthma", discipline, 2));
            });
        }
        // LEVEL 1
        else {
            this.getDisciplines().map((discipline)=>{
                if (this._skills[discipline] === 0)
                    this._quiz.addQuestions(QuestionDAO.getQuestions("Asthma", discipline, 1));
            });
        }
        this.orderQuestions();
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