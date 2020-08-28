import axios from "axios";

import { GET_PROFILES, GET_PROFILE } from "./types";

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

export const getProfile = (userId, token) => (dispatch) => {
  axios
    .get(`/profile/get/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data.profile,
      });
    })
    .catch((err) => {
      console.log("Error fetching and parsing data", err);
    });
};
