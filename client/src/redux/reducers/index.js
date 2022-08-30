import { combineReducers } from "redux";
import auth from "./authReducers";

import app from "./appReducer";

export default combineReducers({
  auth,
  app,
});
