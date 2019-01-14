class Quiz {
    constructor() {
        this._category = "";
        this._questions = [];
        this._questionNumber = 0;

    }
    setCategory(category) {
        this._category = category;
    }
    getCategory() {
        return this._category;
    }
    setQuestions(questions) {
        this._questions = questions;
    }
    addQuestions(questions) {
        this.questions = this._questions.concat(questions);
    }
    getQuestion() {
        return this.questions[this._questionNumber];
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