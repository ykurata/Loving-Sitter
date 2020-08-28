import axios from "axios";

import { GET_PROFILES } from "./types";

export const getProfiles = (token) => (dispatch) => {
  axios
    .get("/profile/get", { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => {
      dispatch({
        type: GET_PROFILES,
        payload: res.data.profile,
      });
    })
    .catch((err) => {
      console.log("Error fetching and parsing data", err);
    });
};
