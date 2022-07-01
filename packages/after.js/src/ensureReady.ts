import { matchPath } from 'react-router-dom';
import { AsyncRouteProps } from './types';
import { isLoadableComponent } from './utils';

/**
 * This helps us to make sure all the async code is loaded before rendering.
 */
export async function ensureReady(
  routes: AsyncRouteProps[],
  pathname?: string
) {
  await Promise.all(
    routes.map((route) => {
      const match = matchPath(pathname || window.location.pathname, route);
      if (
        match &&
        route &&
        route.component &&
        isLoadableComponent(route.component) &&
        route.component.load
      ) {
        return route.component.load();
      }
      return undefined;
    })
  );

  return Promise.resolve(
    (window as any).__SERVER_APP_STATE__ as Promise<any>[]
  );
}
