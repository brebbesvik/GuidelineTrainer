class QuestionMocks {
    constructor() {
        this.questions = [];
        this.alternatives = [];
        this.answerKeys = [];
        this.answerKeyExplanations = [];
        this.questionNumber = 0;
    }
    addQuestions() {
        this.questions.push("A patient arrives at the emergency department. He has a wheeze, lower chest wall indrawing and central cyanosis. At what severity level will you diagnose the patient?");
        this.questions.push("What action should be considered if a patient with severe asthma responds poorly to salbutamol?");
        this.questions.push("How often should a patient with mild symptoms of asthma use the salbutamol inhaler? And how many puffs?")
    }
    addAlternatives () {
        this.alternatives.push(["Severe", "Moderate", "Mild"]);
        this.alternatives.push(["Ipratopium bromide 250 mcg", "Nebulize 5mg of salbutamol", "Give salbutamol every 5th minute"]);
        this.alternatives.push(["6 puffs every 20 minutes", "2 puffs every 20 minutes", "2 puffs every 6 hours"]);
    }
    addAnswerKeys() {
        this.answerKeys.push(0);
        this.answerKeys.push(0);
        this.answerKeys.push(2);

    }
    addAnswerKeyExplanations() {
        this.answerKeyExplanations.push("Difficulty breathing and lower chest wall indrawing are all " +
            "symptoms on asthma. However, in this case central cyanosis is what indicates that the " +
            "asthma is severe.");
        this.answerKeyExplanations.push("Ipratopium bromide 250 mcg should be provided. " +
            "Repeat every 20 minutes for one hour if needed");
        this.answerKeyExplanations.push("2 puffs every 6 hours. Counsel caregiver on signs of\n" +
            "deterioration and schedule review within 48 hours. Demonstrate MDI and spacer use to " +
            "the caregiver before discharge from the health facility. Preferably use spacer with face " +
            "masks for <3 years. Advise on regular follow up")
    }
    generate() {
        this.addQuestions();
        this.addAlternatives();
        this.addAnswerKeys();
        this.addAnswerKeyExplanations();
    }
    getQuestion() {
        return this.questions[this.questionNumber];
    }
    getAlternatives() {
        return this.alternatives[this.questionNumber];
    }
    getAnswerKey() {
        return this.answerKeys[this.questionNumber];
    }
    getAnswerKeyExplanation() {
        return this.answerKeyExplanations[this.questionNumber];
    }
    getNumberOfQuestions() {
        return this.questions.length;
    }
    getQuestionNumber() {
        return this.questionNumber;
    }
    increaseQuestionNumber() {
        this.questionNumber++;
    }
    reset() {
        this.questionNumber = 0;
    }
}
export default QuestionMocks;