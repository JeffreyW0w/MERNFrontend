import {
  ADD_NEW_USER,
  CREATE_USER,
  DELETE_USER,
  REDIRECT_LIST,
  REDIRECT_OVERVIEW,
  UPDATE_USER,
  UPDATE_USER_LIST,
} from "../action_types/action_types";

const initialState = {
  currentPage: "list",
  users: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case REDIRECT_LIST:
      return Object.assign({}, state, { currentPage: "list" });
    case REDIRECT_OVERVIEW:
      return Object.assign({}, state, { currentPage: "overview" });
    case UPDATE_USER:
      let userIndex = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      let newUsers = state.users.slice();
      let replaceUser = Object.assign(newUsers[userIndex], action.payload);
      newUsers.splice(userIndex, 1, replaceUser);
      return Object.assign({}, state, {
        users: newUsers,
      });
    case UPDATE_USER_LIST:
      return Object.assign({}, state, action.payload);
    case DELETE_USER:
      let nUsers = state.users.slice();
      for (const [ind, user] of nUsers.entries()) {
        if (user.id === action.payload.id) {
          nUsers.splice(ind, 1);
        }
      }
      return Object.assign({}, state, {
        users: nUsers,
      });

    case ADD_NEW_USER:
      return Object.assign({}, state, { currentPage: "newUser" });

    case CREATE_USER:
      let newUserList = state.users;
      action.payload.tags = [action.payload.tags];
      newUserList.unshift(action.payload);
      return Object.assign({}, state, {
        users: newUserList,
      });
    default:
      return state;
  }
};

export default rootReducer;
