import axios from "axios";

import { SEND_REQUEST, SNACKBAR_OPEN, SNACKBAR_CLOSE } from "./types";

export const sendRequest = (request, token) => (dispatch) => {
  axios
    .post("/request", request, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      dispatch({
        type: SNACKBAR_OPEN,
        payload: "Request was sent!",
      });
    })
    .catch((err) => {
      dispatch({
        type: SNACKBAR_OPEN,
        payload: "Something wend wrong",
      });
    });
};
