class Question {
    constructor() {
        this._level = 0;
        this._discipline = "";
        this._requiredMinSkill = 0;


        this._narrative = "";
        this._answerKey = "";
        this._answerAlternatives = null;
        this._answerExplanation = "";
    }
    setLevel(level) {
        this._level = level;
    }
    getLevel() {
        return this._level;
    }
    setDiscipline(discipline) {
        this._discipline = discipline
    }
    getDiscipline() {
        return this._discipline;
    }
    setRequiredMinSkill(requiredMinSkill) {
        this._requiredMinSkill = requiredMinSkill;
    }
    getRequiredMinSkill() {
        return this._requiredMinSkill;
    }
    setNarrative(narrative) {
        this._narrative = narrative;
    }
    getNarrative() {
        return this._narrative;
    }
    setAnswerKey(answerKey) {
        this._answerKey = answerKey;
    }
    getAnswerKey() {
        return this._answerKey;
    }
    setAnswerAlternatives(answerAlternatives) {
        this._answerAlternatives = answerAlternatives;
    }
    getAnswerAlternatives() {
        return this._answerAlternatives;
    }
    setAnswerExplanation(answerExplanation) {
        this._answerExplanation = answerExplanation;
    }
    getAnswerExplanation() {
        return this._answerExplanation;
    }
}
module.exports = Question;