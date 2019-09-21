import { AsyncRouteableComponent, AsyncRouteComponentType, AsyncRouteProps,  } from "./types";
import NotFoundComponent from "./NotFoundComponent"
import { matchPath } from 'react-router-dom';

/** @private is the given object a Function? */
export const isFunction = (obj: any) => 'function' === typeof obj;

/** @private is the given object an Object? */
export const isObject = (obj: any) => obj !== null && typeof obj === 'object';

/** @private is the given object/value a promise? */
export const isPromise = (value: any): boolean =>
  isObject(value) && isFunction(value.then);

/** @private Guard cluase to narrow the AsyncRouteableComponent union type on getInitialProps */
export function isAsyncComponent(Component: AsyncRouteableComponent): Component is AsyncRouteComponentType<any> {
  return (<AsyncRouteComponentType<any>>Component).getInitialProps !== undefined;
}

/** @private Guard cluase to narrow the AsyncRouteableComponent union type on load */
export function isLoadableComponent(Component: AsyncRouteableComponent): Component is AsyncRouteComponentType<any> {
  return (<AsyncRouteComponentType<any>>Component).load !== undefined;
}

/** @public Find route similar to how RR Switch does */
export function findMatchedRoute(
  routes: AsyncRouteProps[],
  pathname: string,
) {
  const matchedRoute = routes.find(
    (route) => !!route.hasOwnProperty("path") && !!matchPath(pathname, route)
  ) || routes.find(
    // if no route is found, attempt to find a fallback (not-found) route
    (route) => !route.hasOwnProperty("path")
  )
  // if this is the fallback (not-found) route, `matchPath` errors out if there is no `path`, so we use "*"
  const match = matchedRoute && matchPath(pathname, matchedRoute.hasOwnProperty("path") ? matchedRoute : { path: "**" }) || undefined
  
  return {
    match,
    route: matchedRoute,
  }
}

/** @public Return promise of loading component if it is an `isLoadableComponent` */
export function loadRouteComponent(
  route: AsyncRouteProps,
) {
  if (route.component && isLoadableComponent(route.component) && route.component.load) {
    return route.component.load()
  } else {
    return Promise.resolve(route.component || null)
  }
}

/** @private is given routes have 404 page?  */
export function is404ComponentAvailable(routes: AsyncRouteProps<any>[]): AsyncRouteProps<any> | false {
  return routes.find(route => ["**", "*", undefined].includes(route.path)) || false
}

/** @private Returns 404Component from given routes if component was not avaliable returns default 404component */
export function get404Component(routes: AsyncRouteProps<any>[]): AsyncRouteableComponent<any> {
	const match = is404ComponentAvailable(routes)
  return match ? match.component : NotFoundComponent 
}

/** @private Checks if 404Component is in routes, if it's not available add default 404 component */
export function getAllRoutes(routes: AsyncRouteProps<any>[]): AsyncRouteProps<any>[] {
  return is404ComponentAvailable(routes) ? routes : [...routes, { component: NotFoundComponent }]
}
