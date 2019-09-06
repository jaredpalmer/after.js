import { asyncComponent } from "./asyncComponent";
import { AsyncRouteProps } from "./types";
import path from "path";

export function transformRoutes(
  routes: AsyncRouteProps<any>[]
): AsyncRouteProps<any>[] {
  return routes.map(route => {
    // undocumented feature that used to redirect!
    // that's not a route so we don't to anything with it
    if (route.redirectTo) {
      return route;
    }

    // route must have a "name" property
    if (!route.name) {
      // @todo add link to documentation or show more useful error message
      if (process.env.NODE_ENV !== "production") {
        throw new Error(
          `routes must have a "name" key with value of chunk name ${JSON.stringify(
            { name: "ChunkName", ...route },
            null,
            2
          )}`
        );
      }
    }

    // it's just a route that have a component so
    // user added component no need to do anything here
    // but it must have a "name" property (more info in documentation)
    if (route.component) {
      return route;
    }
    return {
      // we load component from pages folder
      // also add webpackChunkName it's necessary
      // to have links for scripts and css files
      // that code spilited on inital html
      ...route,
      component: asyncComponent({
        loader: () =>
          import(
            /* webpackChunkName: "[request]" */ path.join(
              __dirname,
              process.env.RAZZLE_AFTER_PAGES_DIR!,
              route.name!
            )
          ),
        Placeholder: route.Placeholder
      })
    };
  });
}
