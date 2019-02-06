import {AsyncStorage} from "react-native";
import QuizDAO from "../DAO/QuizDAO";
import QuestionDAO from "../DAO/QuestionDAO";
import Game from "../GameEngine/Game";
import Skill from "../Model/Skill";

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
                Game.getDisciplines().map((discipline)=> {
                   if (scores.hasOwnProperty(discipline)) {
                       scores[discipline] = QuizDAO.getAllowedLevels("Asthma", discipline, scores[discipline]);
                   }
                   else {
                       scores[discipline] = QuizDAO.getAllowedLevels("Asthma", discipline, 0);
                   }
                });/*
                for (let discipline in scores) {
                    console.log("Discipline", discipline, "Scores", scores);
                    scores[discipline] = QuizDAO.getAllowedLevels("Asthma", discipline, scores[discipline]);
                }*/
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
                Game.getDisciplines().map((discipline)=> {
                    if (scores.hasOwnProperty(discipline)) {
                        scores[discipline] = QuizDAO.getUnallowedLevels("Asthma", discipline, scores[discipline]);
                    }
                    else {
                        scores[discipline] = QuizDAO.getUnallowedLevels("Asthma", discipline, 0);
                    }
                });
                /*for (let discipline in scores) {
                    scores[discipline] = QuizDAO.getUnallowedLevels("Asthma", discipline, scores[discipline]);
                }*/
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
        skills: Game.getSkills(),
    }
};
export const initializeQuiz = ()=> {
    return (dispatch) => {
        let disciplines = Game.getDisciplines();
        AsyncStorage.getItem("Asthma")
            .then((result)=> {
                let element = JSON.parse(result);
                disciplines.map((discipline)=> {
                   let skill = new Skill();
                   skill.setDiscipline(discipline);
                   if (element.hasOwnProperty(discipline)) {
                       Game.addQuestions(QuestionDAO.getQuestions("Asthma", discipline, element[discipline]));
                       skill.setScore(element[discipline]);
                   }
                   else {
                       Game.addQuestions(QuestionDAO.getQuestions("Asthma", discipline, 0));
                       skill.setScore(0);
                   }
                   Game.addSkill(skill);
                });
                dispatch(INITIALIZE_QUIZ())
            });
    }
};
