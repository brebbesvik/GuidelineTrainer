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
        console.log("SETTER ALLLOWED!!!!!");
        this._allowedLevels = levels;
    }
    getAllowedLevels() {
        console.log("GETTER ALLLOWED!!!!!");
        return this._allowedLevels;
    }
    setUnAllowedLevels(levels) {
        console.log("SETTER UNALLLOWED!!!!!");
        this._unallowedLevels = levels;
    }
    getUnAllowedLevels() {
        console.log("GETTER UNALLLOWED!!!!!");
        return this._unallowedLevels;
    }

}
module.exports = Discipline;