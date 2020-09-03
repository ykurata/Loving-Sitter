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
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILES:
      return {
        ...state,
        loading: true,
        profiles: action.payload,
      };
    case GET_PROFILE:
      return {
        ...state,
        loading: true,
        profile: action.payload,
      };
    case CREATE_PROFILE:
      return {
        ...state,
        snackbarOpen: true,
        snackbarMsg: action.payload,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        snackbarOpen: true,
        snackbarMsg: action.payload,
      };
    default:
      return state;
  }
}
