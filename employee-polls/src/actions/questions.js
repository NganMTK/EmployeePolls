import { saveQuestion, saveQuestionAnswer } from "../utils.js/api";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { addQuestionUser, addAnswerUser } from "./users";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_QUESTION_ANSWER = "ADD_QUESTION_ANSWER";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function addQuestion(question, authedUser) {
  return {
    type: ADD_QUESTION,
    question,
    authedUser,
  };
}

export function addQuestionAnswer(authedUserId, qid, answer) {
  return {
    type: ADD_QUESTION_ANSWER,
    authedUserId,
    qid,
    answer,
  };
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading());

    return saveQuestion(optionOneText, optionTwoText, authedUser)
      .then((question) => {
        dispatch(addQuestion(question, authedUser));
        dispatch(addQuestionUser(authedUser, question.id));
      })
      .then(() => dispatch(hideLoading()));
  };
}

export function handAddQuestionAnswer(qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading());

    return saveQuestionAnswer(authedUser, qid, answer)
      .then(() => {
        dispatch(addQuestionAnswer(authedUser, qid, answer));
        dispatch(addAnswerUser(authedUser, qid, answer));
      })
      .then(() => dispatch(hideLoading()));
  };
}
