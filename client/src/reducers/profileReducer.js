import { GET_PROFILES, GET_PROFILE } from "../actions/types";

const initialState = {
  profiles: [],
  profile: "",
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
    default:
      return state;
  }
}
