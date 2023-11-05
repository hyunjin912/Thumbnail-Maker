import { combineReducers } from "redux";
import image from "./image";
import column from "./column";

const rootReducer = combineReducers({
  image,
  column
});

export default rootReducer;
