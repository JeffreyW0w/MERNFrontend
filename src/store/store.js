import { combineReducers, createStore } from "redux";
import rootReducer from "../reducer/rootReducer";

const store = createStore(
  combineReducers({
    rootReducer: rootReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
