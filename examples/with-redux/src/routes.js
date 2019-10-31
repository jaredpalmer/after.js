import React from "react";

import { asyncComponent } from "@jaredpalmer/after";

export default [
  {
    name: "Home",
    path: "/",
    exact: true,
    component: asyncComponent({
      loader: () => import(/* webpackChunkName: "Home" */ "./Home"), // required
      Placeholder: () => <div>...LOADING...</div>
    })
  },
  {
    name: "About",
    path: "/about",
    exact: true,
    component: asyncComponent({
      loader: () => import(/* webpackChunkName: "About" */ "./About"),
      Placeholder: () => <div>...LOADING...</div>
    })
  }
];
