import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import snackbarReducer from "./snackbarReducer";
import requestReducer from "./requestReducer";

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  profile: profileReducer,
  snackbar: snackbarReducer,
  request: requestReducer,
});
