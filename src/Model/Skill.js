class Skill {
    constructor() {
        this._discipline = "";
        this._score = 0;
    }
    setDiscipline(discipline) {
        this._discipline = discipline;
    }
    getDiscipline() {
        return this._discipline;
    }
    setScore(score) {
        this._score = score;
    }
    getScore() {
        return this._score;
    }
    addReward(reward) {
        this._score += reward;
    }
}
module.exports = Skill;