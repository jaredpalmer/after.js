import { TRoutes, TRouteData } from './types';
import { findMatchedRoute, loadRouteComponent } from './utils';

/**
 * This helps us to make sure all the async code is loaded before rendering.
 */
export async function ensureReady(routes: TRoutes, pathname?: string) {
  const {route} = findMatchedRoute(routes, pathname || window.location.pathname)
  if (route) {
    await loadRouteComponent(route)
  }
  let data = {} as TRouteData;
  if (typeof window !== undefined && !!document) {
    // deserialize state from 'serialize-javascript' format
    // tslint:disable-next-line
    data = eval("(" + (document as any).getElementById("server-app-state").textContent + ")");
  }
  return Promise.resolve(data);
}
