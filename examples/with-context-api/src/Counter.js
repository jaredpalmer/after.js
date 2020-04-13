import React from "react";
import { useCount, useDispatchCount } from "./context/AppContext";
import "./Home.css";

const Counter = () => {
  const count = useCount();
  const dispatch = useDispatchCount();

  const handleIncrease = (event) => dispatch({ type: "INCREASE" });
  const handleDecrease = (event) => dispatch({ type: "DECREASE" });
  const handleIncrease15 = (event) =>
    dispatch({
      type: "INCREASE_BY",
      payload: 15,
    });

  return (
    <div>
      <p>
        <strong>Count is : {count}</strong>
      </p>
      <div className="btn-container">
        <span className="btn" onClick={handleIncrease}>
          Add
        </span>
        <span className="btn" onClick={handleDecrease}>
          Subtract
        </span>
        <span className="btn" onClick={handleIncrease15}>
          Increase By 15
        </span>
      </div>
    </div>
  );
};

export default Counter;
