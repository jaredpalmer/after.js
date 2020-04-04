import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ensureReady, After } from "@jaredpalmer/after";
import "./client.css";
import routes from "./routes";
import { AppProvider as Store } from "./context/AppContext";

ensureReady(routes).then(data =>
  hydrate(
    <BrowserRouter>
      <Store>
        <After data={data} routes={routes} />
      </Store>
    </BrowserRouter>,
    document.getElementById("root")
  )
);

if (module.hot) {
  module.hot.accept();
}
