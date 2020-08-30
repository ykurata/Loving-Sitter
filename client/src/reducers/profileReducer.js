import {
  GET_PROFILES,
  GET_PROFILE,
  CREATE_PROFILE,
  UPDATE_PROFILE,
} from "../actions/types";

const initialState = {
  profiles: [],
  profile: "",
  snackbarOpen: false,
  snakbarMsg: "",
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    case CREATE_PROFILE:
      return {
        ...state,
        snackbarOpen: true,
        snackbarMsg: "Profile saved",
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        snackbarOpen: true,
        snackbarMsg: "Profile saved",
      };
    default:
      return state;
  }
}
