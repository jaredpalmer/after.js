import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { ensureReady, After } from "@jaredpalmer/after";
import "./client.css";
import routes from "./routes";
import reducers from "./reducers";

const store = createStore(
  reducers,
  window.INITIAL_STATE,
  applyMiddleware(thunk)
);

ensureReady(routes).then(data =>
  hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <After data={data} routes={routes} store={store} />
      </BrowserRouter>
    </Provider>,
    document.getElementById("root")
  )
);

if (module.hot) {
  module.hot.accept();
}
