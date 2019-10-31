import { FETCH_TEST } from "../actions";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_TEST:
      return action.payload;

    default:
      return state;
  }
};
