import React from "react";
import { DECREMENT_COUNTER,  INCREMENT_COUNTER,  RESET_COUNTER } from "./Actions/ActionTypes";

const AppContext = React.createContext();
const AppDispatch = React.createContext();

const initialState = {
  count: 0,
  changeStatus: ""
};

function counterReducer(state, action) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return { ...state, count: state.count + 1, changeStatus: "Incrementing" };
    case DECREMENT_COUNTER:
      return { ...state, count: state.count - 1, changeStatus: "Decrementing" };
    case RESET_COUNTER:
      return { ...state, count: 0, changeStatus: "" };
    default:
      return state;
  }
}

function AppProvider({ children }) {
  const [state, dispatch] = React.useReducer(counterReducer, initialState);
  return (
    <AppContext.Provider value={state}>
      <AppDispatch.Provider value={dispatch}>{children}</AppDispatch.Provider>
    </AppContext.Provider>
  );
}

function useAppState() {
  const context = React.useContext(AppContext);
  if (context == undefined) {
    throw new Error("AppState should be used within a AppProvider");
  }
  return context;
}
function useAppDispatch() {
  const context = React.useContext(AppDispatch);
  if (context == undefined) {
    throw new Error("AppDispatch should be used within a AppProvider");
  }
  return context;
}

export { AppProvider, useAppDispatch, useAppState };
