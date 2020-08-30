import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import snackbarReducer from "./snackbarReducer";

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  profile: profileReducer,
  snackbar: snackbarReducer,
});
