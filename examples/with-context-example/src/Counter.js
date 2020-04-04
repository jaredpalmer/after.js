import React from "react";
import { useAppState, useAppDispatch } from "./context/AppContext";
import {
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
  RESET_COUNTER
} from "./context/Actions/ActionTypes";
import "./Home.css";

const Counter = () => {
  const { count, changeStatus } = useAppState();
  const dispatch = useAppDispatch();
  return (
    <div>
      <p>
        <strong>Count is : {count}</strong>
      </p>
      <h2>Action Status is: {changeStatus}</h2>
      <div className="btn-container">
        <span
          className="btn"
          onClick={() => dispatch({ type: INCREMENT_COUNTER })}
        >
          Add
        </span>
        <span
          className="btn"
          onClick={() => dispatch({ type: DECREMENT_COUNTER })}
        >
          Subtract
        </span>
        <span className="btn" onClick={() => dispatch({ type: RESET_COUNTER })}>
          Reset
        </span>
      </div>
    </div>
  );
};

export default Counter;
