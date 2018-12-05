class QuestionMocks {
    constructor() {
        this.questions = [];
        this.alternatives = [];
        this.answerKeys = [];
        this.questionNumber = 0;
    }
    addQuestions() {
        this.questions.push("Which severity do exist for asthma?");
        this.questions.push("What is the severity level of the patient if (s)he is verbal, but not alert?");
        this.questions.push("How often should a patient with mild symptoms of asthma use the salbutamol inhaler? And how many puffs?")
    }
    addAlternatives () {
        this.alternatives.push(["Severe", "Crucial", "Life threatening"]);
        this.alternatives.push(["Severe", "Moderate", "Mild"]);
        this.alternatives.push(["6 puffs every 20 minutes", "2 puffs every 20 minutes", "2 puffs every 6 hours"]);
    }
    addAnswerKeys() {
        this.answerKeys.push(0);
        this.answerKeys.push(0);
        this.answerKeys.push(2);

    }
    generate() {
        this.addQuestions();
        this.addAlternatives();
        this.addAnswerKeys();
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