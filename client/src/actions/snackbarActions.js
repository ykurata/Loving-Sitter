import { SNACKBAR_OPEN, SNACKBAR_CLOSE } from "./types";

// export const openSnackbar = (message) => (dispatch) => {
//   dispatch({
//     type: SNACKBAR_OPEN,
//     message,
//   });
// };

export const closeSnackbar = () => (dispatch) => {
  dispatch({
    type: SNACKBAR_CLOSE,
  });
};
