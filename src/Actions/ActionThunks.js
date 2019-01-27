import {AsyncStorage} from "react-native";
import QuizDAO from "../DAO/QuizDAO";
import QuestionDAO from "../DAO/QuestionDAO";
import Game from "../GameEngine/Game";

export const GET_UNLOCKED_LEVELS = (result)=> {
    return {
        type: "GET_UNLOCKED_LEVELS",
        unlockedLevels: result,
    };
};
export const getUnlockedLevels = ()=> {
    return (dispatch) => {
        AsyncStorage.getItem("Asthma")
            .then((result)=>{
                let scores = JSON.parse(result);
                for (let discipline in scores) {
                    scores[discipline] = QuizDAO.getAllowedLevels("Asthma", discipline, scores[discipline]);
                }
                dispatch(GET_UNLOCKED_LEVELS(JSON.parse(JSON.stringify(scores))));
            });

    };
};

export const GET_LOCKED_LEVELS = (result) => {
    return {
        type: "GET_LOCKED_LEVELS",
        lockedLevels: result,
    };
};
export const getLockedLevels = ()=> {
    return (dispatch) => {
        AsyncStorage.getItem("Asthma")
            .then((result)=>{
                let scores = JSON.parse(result);
                for (let discipline in scores) {
                    scores[discipline] = QuizDAO.getUnallowedLevels("Asthma", discipline, scores[discipline]);
                }
                dispatch(GET_LOCKED_LEVELS(JSON.parse(JSON.stringify(scores))));
            });

    };
};


export const INITIALIZE_QUIZ = ()=> {
    return {
        type: "INITIALIZE_QUIZ",
        discipline: Game.getQuiz().getQuestion().getDiscipline(),
        problem: Game.getQuiz().getQuestion().getNarrative(),
        alternatives: Game.getQuiz().getQuestion().getAnswerAlternatives(),
        correctAlternative: Game.getQuiz().getQuestion().getAnswerKeyIndex(),
        questionNumber: Game.getQuiz().getQuestionNumber(),
        numberOfQuestions: Game.getQuiz().getNumberOfQuestions(),
        answerKeyExplanation: Game.getQuiz().getQuestion().getAnswerExplanation(),


    }
};
export const initializeQuiz = ()=> {
    return (dispatch) => {
        let disciplines = Game.getDisciplines();
        AsyncStorage.getItem("Asthma")
            .then((result)=> {
                let element = JSON.parse(result);
                disciplines.map((discipline)=> {
                   if (element.hasOwnProperty(discipline)) {
                       Game.addQuestions(QuestionDAO.getQuestions("Asthma", discipline, element[discipline]));
                   }
                   else {
                       Game.addQuestions(QuestionDAO.getQuestions("Asthma", discipline, 0));
                   }
                });
                dispatch(INITIALIZE_QUIZ())
            });
    }
};
