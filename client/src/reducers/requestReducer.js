import { GET_REQUESTS, GET_JOBS } from "../actions/types";

const initialState = {
  requests: [],
  jobs: [],
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_REQUESTS:
      return {
        ...state,
        loading: true,
        requests: action.payload,
      };
    case GET_JOBS:
      return {
        ...state,
        loading: true,
        jobs: action.payload,
      };
    default:
      return state;
  }
}
