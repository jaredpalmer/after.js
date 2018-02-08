import { matchPath, RouteProps } from 'react-router-dom';

/**
 * This helps us to make sure all the async code is loaded before rendering.
 */
export function ensureReady(routes: RouteProps[], pathname: string) {
  return Promise.all(
    routes.map(route => {
      const match = matchPath(pathname || window.location.pathname, route);
      if (match && route && route.component && (route.component as any).load) {
        return (route.component as any).load();
      }
      return undefined;
    })
  );
}
