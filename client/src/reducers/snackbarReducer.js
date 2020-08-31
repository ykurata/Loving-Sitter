import {
  SNACKBAR_OPEN,
  SNACKBAR_OPEN_WITH_ERROR,
  SNACKBAR_CLOSE,
} from "../actions/types";

const initialState = {
  snackbarOpen: false,
  snackbarMsg: "",
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SNACKBAR_OPEN:
      return {
        ...state,
        snackbarOpen: true,
        snackbarMsg: "Succesfully saved!",
      };
    case SNACKBAR_OPEN_WITH_ERROR:
      return {
        ...state,
        snackbarOpen: true,
        snackbarMsg: "SOmething went wrong",
      };
    case SNACKBAR_CLOSE:
      return {
        ...state,
        snackbarOpen: false,
      };
    default:
      return state;
  }
}