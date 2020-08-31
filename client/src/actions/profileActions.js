import axios from "axios";

import {
  GET_PROFILES,
  GET_PROFILE,
  GET_ERRORS,
  SNACKBAR_OPEN,
  SNACKBAR_CLOSE,
} from "./types";

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

export const createProfile = (userInput, token) => (dispatch) => {
  axios
    .post("profile/create", userInput, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      dispatch({
        type: SNACKBAR_OPEN,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const updateProfile = (userId, userInput, token) => (dispatch) => {
  axios
    .put(`profile/update/${userId}`, userInput, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      dispatch({
        type: SNACKBAR_OPEN,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const postProfileImage = (formData, token) => (dispatch) => {
  axios
    .post("/files/image-upload", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      dispatch({
        type: SNACKBAR_OPEN,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
