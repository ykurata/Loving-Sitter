import { GET_PROFILES } from "../actions/types";

const initialState = {
  profiles: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
      };
    default:
      return state;
  }
}
