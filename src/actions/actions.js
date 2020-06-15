import {
  ADD_NEW_USER,
  CREATE_USER,
  DELETE_USER,
  REDIRECT_LIST,
  REDIRECT_OVERVIEW,
  UPDATE_USER,
  UPDATE_USER_LIST,
} from "../action_types/action_types";

export const redirectOverview = () => {
  return {
    type: REDIRECT_OVERVIEW,
  };
};

export const redirectList = () => {
  return {
    type: REDIRECT_LIST,
  };
};

export const updateUser = (payload) => {
  return {
    type: UPDATE_USER,
    payload: payload,
  };
};

export const updateUserList = (payload) => {
  return {
    type: UPDATE_USER_LIST,
    payload: payload,
  };
};

export const deleteUser = (payload) => {
  return {
    type: DELETE_USER,
    payload: payload,
  };
};

export const addNewUser = () => {
  return {
    type: ADD_NEW_USER,
  };
};

export const createUser = (payload) => {
  return {
    type: CREATE_USER,
    payload: payload,
  };
};
