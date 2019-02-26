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
                       Game.getQuiz().getDiscipline(discipline).setAllowedLevels(QuizDAO.getAllowedLevels("Asthma", discipline, scores[discipline]));

                   }
                   else {
                       Game.getQuiz().getDiscipline(discipline).setAllowedLevels(QuizDAO.getAllowedLevels(QuizDAO.getAllowedLevels("Asthma", discipline, 0)));
                   }
                   scores[discipline] = Game.getAllowedLevels(discipline);
                });
                dispatch(GET_UNLOCKED_LEVELS(JSON.parse(JSON.stringify(scores))));
            })
            .catch(()=> {
                let scores = {};
                Game.getDisciplines().map((discipline)=> {
                    Game.getQuiz().getDiscipline(discipline).setAllowedLevels(QuizDAO.getAllowedLevels("Asthma", discipline, 0));
                    scores[discipline] = Game.getAllowedLevels(discipline);
                    dispatch(GET_UNLOCKED_LEVELS(JSON.parse(JSON.stringify(scores))));
                });

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
                        Game.getQuiz().getDiscipline(discipline).setUnAllowedLevels(QuizDAO.getUnAllowedLevels("Asthma", discipline, scores[discipline]));
                    }
                    else {
                        Game.getQuiz().getDiscipline(discipline).setUnAllowedLevels(QuizDAO.getUnAllowedLevels("Asthma", discipline, 0));
                    }
                    scores[discipline] = Game.getUnAllowedLevels(discipline);
                });
                dispatch(GET_LOCKED_LEVELS(JSON.parse(JSON.stringify(scores))));
            })
            .catch(()=> {
                let scores = {};
                Game.getDisciplines().map((discipline) => {
                    Game.getQuiz().getDiscipline(discipline).setUnAllowedLevels(QuizDAO.getUnAllowedLevels("Asthma", discipline, 0));
                    scores[discipline] = Game.getUnAllowedLevels(discipline);
                        dispatch(GET_LOCKED_LEVELS(JSON.parse(JSON.stringify(scores))));
                });
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
            })
            .catch(()=>{
                Game.getDisciplines().map((discipline) => {
                    let skill = new Skill();
                    skill.setDiscipline(discipline);
                    Game.addQuestions(QuestionDAO.getQuestions("Asthma", discipline, 0));
                    skill.setScore(0);
                    Game.addSkill(skill);
                });
                dispatch(INITIALIZE_QUIZ());
            });
    }
};

export const STORE_SCORES = ()=> {
  return {
      type: "STORE_SCORES",
  };
};
export const storeScores = ()=> {
  return (dispatch, getState)=> {
      let skills = getState().counterReducer.scores;
      let dict = {};
      for(let i=0; i<skills.length; i++) {
          dict[skills[i].getDiscipline()] = skills[i].getScore();
      }
      AsyncStorage.setItem("Asthma", JSON.stringify(dict))
          .catch(()=>console.log("Something when wrong storing the results"));
  };
};
