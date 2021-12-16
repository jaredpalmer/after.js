import { matchPath, match as MatchType } from 'react-router-dom';
import { AsyncRouteProps, ServerAppState } from './types';
import { isLoadableComponent } from './utils';

type EnsureReadyResult = ServerAppState & { match?: MatchType };

/**
 * This helps us to make sure all the async code is loaded before rendering.
 */
export async function ensureReady(
  routes: AsyncRouteProps[],
  pathname?: string
): Promise<EnsureReadyResult> {
  const location = pathname || window.location.pathname;
  let matchedRoute;

  await Promise.all(
    routes.map(route => {
      const match = matchPath(location, route);

      if (match && route && route.component) {
        matchedRoute = match;

        if (isLoadableComponent(route.component) && route.component.load) {
          return route.component.load();
        }
      }

      return undefined;
    })
  );

  return {
    ...((window as any).__SERVER_APP_STATE__ as ServerAppState),
    match: matchedRoute,
  };
}
