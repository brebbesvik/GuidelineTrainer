class Discipline {
    constructor(name=""){
        this._name = name;
        this._allowedLevels = [];
        this._unallowedLevels= [];
    }
    getName() {
        return this._name;
    }
    setName(name) {
        this._name = name;
    }
    setAllowedLevels(levels) {
        this._allowedLevels = levels;
    }
    getAllowedLevels() {
        return this._allowedLevels;
    }
    setUnAllowedLevels(levels) {
        this._unallowedLevels = levels;
    }
    getUnAllowedLevels() {
        return this._unallowedLevels;
    }

}
module.exports = Discipline;