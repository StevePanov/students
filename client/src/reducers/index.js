import { combineReducers } from "redux";

import students from "./students";
import search from "./search";


export default combineReducers({
  students,
  search
});
