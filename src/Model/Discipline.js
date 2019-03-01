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
    getAllowedLevel(level) {
        return this._allowedLevels.map((allowedLevel)=>{
           if (allowedLevel.getLevel() === level)
               return allowedLevel;
        })();
    }
    getLastAllowedLevel() {
        let lastAllowedLevel = -1;
        this._allowedLevels.map((allowedLevel, index) => {
            if (allowedLevel.getLevel() > lastAllowedLevel)
                lastAllowedLevel = index;
        });
        if (lastAllowedLevel > -1) return this._allowedLevels[lastAllowedLevel];
        else return null;
    }

    setUnAllowedLevels(levels) {
        this._unallowedLevels = levels;
    }
    getUnAllowedLevels() {
        return this._unallowedLevels;
    }

}
module.exports = Discipline;