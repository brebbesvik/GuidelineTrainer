import {AsyncStorage} from "react-native";
import QuizDAO from "../DAO/QuizDAO";
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
            .then((result) => {
                let lastCompletedLevels = JSON.parse(result);
                Game.getDisciplines().map((discipline) => {
                    if (lastCompletedLevels.hasOwnProperty(discipline)) {
                        Game.getQuiz().getDiscipline(discipline).setAllowedLevels(QuizDAO.getUnlockedLevels("Asthma", discipline, lastCompletedLevels[discipline]+1));
                    } else {
                        Game.getQuiz().getDiscipline(discipline).setAllowedLevels(QuizDAO.getUnlockedLevels("Asthma", discipline, 1));
                    }
                    lastCompletedLevels[discipline] = Game.getAllowedLevels(discipline);
                });
                dispatch(GET_UNLOCKED_LEVELS(JSON.parse(JSON.stringify(lastCompletedLevels))));
            })
            .catch(() => {
                let lastCompletedLevels = {};
                Game.getDisciplines().map((discipline) => {
                    Game.getQuiz().getDiscipline(discipline).setAllowedLevels(QuizDAO.getUnlockedLevels("Asthma", discipline, 1));
                    lastCompletedLevels[discipline] = Game.getAllowedLevels(discipline);
                    dispatch(GET_UNLOCKED_LEVELS(JSON.parse(JSON.stringify(lastCompletedLevels))));
                });
            });
    }
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
            .then((result) => {
                let lastCompletedLevels = JSON.parse(result);
                Game.getDisciplines().map((discipline) => {
                    if (lastCompletedLevels.hasOwnProperty(discipline)) {
                        Game.getQuiz().getDiscipline(discipline).setUnAllowedLevels(QuizDAO.getLockedLevels("Asthma", discipline, lastCompletedLevels[discipline]+1));
                    } else {
                        Game.getQuiz().getDiscipline(discipline).setUnAllowedLevels(QuizDAO.getLockedLevels("Asthma", discipline, 1));
                    }
                    lastCompletedLevels[discipline] = Game.getUnAllowedLevels(discipline);
                });
                dispatch(GET_LOCKED_LEVELS(JSON.parse(JSON.stringify(lastCompletedLevels))));
            })
            .catch(() => {
                let lastCompletedLevels = {};
                Game.getDisciplines().map((discipline) => {
                    Game.getQuiz().getDiscipline(discipline).setUnAllowedLevels(QuizDAO.getLockedLevels("Asthma", discipline, 1));
                    lastCompletedLevels[discipline] = Game.getUnAllowedLevels(discipline);
                    dispatch(GET_LOCKED_LEVELS(JSON.parse(JSON.stringify(lastCompletedLevels))));
                });
            });
    }
};



export const INITIALIZE_QUIZ = ()=> {
    return {
        type: "INITIALIZE_QUIZ",
        scores: Game.getScores(),
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
        let skill = {};
        AsyncStorage.getItem("Asthma")
            .then((result)=> {
                let element = JSON.parse(result);
                disciplines.map((discipline)=> {
                   if (element.hasOwnProperty(discipline)) {
                       //Game.addQuestions(QuestionDAO.getQuestions("Asthma", discipline, element[discipline]));
                       skill[discipline] = element[discipline];
                   }
                   else {
                       //Game.addQuestions(QuestionDAO.getQuestions("Asthma", discipline, 0));
                       skill[discipline] = 0;
                   }
                });
                Game.setSkills(skill);
                Game.setInitialScore();
                Game.addQuestions();
                dispatch(INITIALIZE_QUIZ())
            })
            .catch(()=>{
                console.log("????????????????????????????????????????????");
                let skill = {};
                Game.getDisciplines().map((discipline) => {
                    //Game.addQuestions(QuestionDAO.getQuestions("Asthma", discipline, 0));
                    skill[discipline] = 0;

                });
                Game.setSkills(skill);
                Game.addQuestions();
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
      let scores = getState().counterReducer.scores;
      let skills = getState().counterReducer.skills;
      console.log("STORE SCORES", scores);
      console.log("STORE SKILLS", skills);
      let dict = {};
      let followUpIndex = 3;
      scores.map((score, index)=> {
          if (score.getDiscipline() === "Follow-up") followUpIndex = index;
          let lastUnlockedLevel = Game.getQuiz().getDiscipline(score.getDiscipline()).getLastAllowedLevel();
          if (lastUnlockedLevel) {
              if (lastUnlockedLevel.getPassingCondition() <= score.getScore()) {
                  dict[score.getDiscipline()] = lastUnlockedLevel.getLevel();
              }
              else if (lastUnlockedLevel.getRequiredMinSkill() > score.getScore()) {
                  dict[score.getDiscipline()] = lastUnlockedLevel.getLevel() - 2;
              }
              else {
                  dict[score.getDiscipline()] = lastUnlockedLevel.getLevel() - 1;
              }
          }
          else {
              dict[score.getDiscipline()] = 0;
          }
      });
      // TODO return a new state instead of changing the object
      if (dict["Assessment"] >= 1 && dict["Diagnosis"] >= 1 && dict["Management"] >= 1 && dict["Follow-up"] === 0) {
          dict["Follow-up"] = 1;
          scores[followUpIndex].setScore(10);
      }
      console.log("DICT:", dict);
      if(dict["Assessment"] === 3 && dict["Diagnosis"] === 3 && dict["Management"] === 3 && dict["Follow-up"] === 3) {
          let resetDict = {"Assessment": 0, "Diagnosis": 0, "Management": 0, "Follow-up": 0};
          console.log("RESETDICT", resetDict);
          AsyncStorage.setItem("Asthma", JSON.stringify(resetDict))
              .catch(() => console.log("Something went wrong when storing the reset results"));
      }
      else
          AsyncStorage.setItem("Asthma", JSON.stringify(dict))
          .catch(()=>console.log("Something went wrong when storing the results"));
  };
};
