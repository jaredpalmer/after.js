import axios from "axios";

export const FETCH_TEST = "fetch_test";
export const fetchTest = () => async dispatch => {
  const res = await axios.get("http://jsonplaceholder.typicode.com/posts");

  dispatch({
    type: FETCH_TEST,
    payload: res.data
  });
};
