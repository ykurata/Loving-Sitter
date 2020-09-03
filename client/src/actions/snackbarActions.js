import { SNACKBAR_CLOSE } from "./types";

export const closeSnackbar = () => (dispatch) => {
  dispatch({
    type: SNACKBAR_CLOSE,
  });
};
