import { matchPath } from 'react-router-dom';
import { EnsureReadyParams } from './types';
import { isLoadableComponent, stripBasename } from './utils';

/**
 * This helps us to make sure all the async code is loaded before rendering.
 */
export async function ensureReady({
  routes,
  pathname,
  basename,
}: EnsureReadyParams) {
  await Promise.all(
    routes.map(route => {
      const pathnameToUseToMatch = stripBasename(
        pathname || window.location.pathname,
        basename
      );

      const match = matchPath(pathnameToUseToMatch, route);
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
