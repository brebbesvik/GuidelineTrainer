class AnswerAlternative {
    constructor() {
        this._alternative = "";
        this._reward = 0;
    }
    setAlternative(alternative) {
        this._alternative = alternative;
    }
    getAlternative() {
        return this._alternative;
    }
    setReward(reward) {
        this._reward = reward;
    }
    getReward() {
        return this._reward;
    }
}
module.exports = AnswerAlternative;