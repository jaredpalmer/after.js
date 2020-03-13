import { matchRoutes } from 'react-router-config';
import { AsyncRouteConfig } from './types';
import { isLoadableComponent } from './utils';
import { getSerializedData } from './serializeData';

/**
 * This helps us to make sure all the async code is loaded before rendering.
 */
export async function ensureReady(
  routes: AsyncRouteConfig[],
  pathname?: string
) {
  const branches = matchRoutes(routes, pathname || window.location.pathname);
  await Promise.all(
    branches.map(({ route, match }) => {
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

  return Promise.resolve(getSerializedData('server_app_state'));
}
