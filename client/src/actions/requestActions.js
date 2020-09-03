import axios from "axios";

import { SNACKBAR_OPEN, GET_REQUESTS, GET_JOBS } from "./types";

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

export const getRequests = (token) => (dispatch) => {
  axios
    .get("/request/get-requests", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      dispatch({
        type: GET_REQUESTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteRequest = (item, token) => (dispatch) => {
  axios
    .delete(`request/delete/${item._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      console.log("successfully deleted");
    });
  axios
    .get("/request/get-requests", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      dispatch({
        type: GET_REQUESTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getJobs = (token) => (dispatch) => {
  axios
    .get("/request/get-requested", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      dispatch({
        type: GET_JOBS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const declineRequest = (item, token) => (dispatch) => {
  axios
    .delete(`request/delete/${item._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      console.log("successfully deleted");
    });
  axios
    .get("/request/get-requested", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      dispatch({
        type: GET_JOBS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const changeRequestStatue = (item, request, token) => (dispatch) => {
  axios
    .put(`request/update/${item._id}`, request, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      return axios
        .get("/request/get-requested", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          dispatch({
            type: GET_JOBS,
            payload: res.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
