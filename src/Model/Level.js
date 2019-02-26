class Level {
    constructor(){
        this._level = 0;
        this._requiredMinSkill = 0;
        this._passingCondition = 0;
        this._questions = [];
    }
    setLevel(level) {
        this._level=level;
    }
    getLevel() {
        return this._level;
    }
    setRequiredMinSkill(requiredMinSkill) {
        this._requiredMinSkill = requiredMinSkill;
    }
    getRequiredMinSkill() {
        return this._requiredMinSkill;
    }
    setPassingCondition(passingCondition) {
        this._passingCondition = passingCondition;
    }
    getPassingCondition() {
        return this._passingCondition;
    }
    setQuestions(questions) {
        this._questions  = questions;
    }
    getQuestions() {
        return this._questions;
    }
    addQuestion(question) {
        this._questions.push(question)
    }
    getQuestion(index) {
        return this._questions[index];
    }
}
module.exports = Level;