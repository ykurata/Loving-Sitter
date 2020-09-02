import { GET_REQUESTS, GET_JOBS } from "../actions/types";

const initialState = {
  requests: [],
  jobs: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_REQUESTS:
      return {
        ...state,
        requests: action.payload,
      };
    case GET_JOBS:
      return {
        ...state,
        jobs: action.payload,
      };
    default:
      return state;
  }
}
