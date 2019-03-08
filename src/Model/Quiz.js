class Quiz {
    constructor() {
        this._category = "";
        this._questions = [];
        this._disciplines = [];
        this._allLevels = [];
        this._allowedLevels = [];
        this._questionNumber = 0;

    }
    setCategory(category) {
        this._category = category;
    }
    getCategory() {
        return this._category;
    }
    setDisciplines(disciplines) {
        this._disciplines = disciplines;
    }
    getDisciplines() {
        return this._disciplines;
    }
    getDiscipline(name) {
        for (let i = 0; i < this._disciplines.length; i++) {
            if (this._disciplines[i].getName() === name) {
                return this._disciplines[i];
            }
        }
    }
    getAllLevels() {
        return this._allLevels;
    }
    setAllLevels(levels) {
        this._allLevels = levels;
    }
    getAllowedLevels() {
        return this._allowedLevels;
    }
    setAllowedLevels(levels) {
        this._allowedLevels = levels;
    }
    addAllowedLevels(discipline, levels) {
        this._allowedLevels[discipline] = levels;
    }
    setQuestions(questions) {
        this._questions = questions;
    }
    addQuestions(questions) {
        this._questions = this._questions.concat(questions);
    }
    getQuestion() {
        return this._questions[this._questionNumber];
    }
    getQuestions() {
        return this._questions;
    }
    getNumberOfQuestions() {
        return this._questions.length;
    }
    getQuestionNumber() {
        return this._questionNumber;
    }
    increaseQuestionNumber() {
        this._questionNumber++;
    }
    reset() {
        this._questionNumber = 0;
    }
}
module.exports = Quiz;