import { matchPath } from 'react-router-dom';
import { AsyncRouteProps } from './types';

/**
 * This helps us to make sure all the async code is loaded before rendering.
 */
export async function ensureReady(routes: AsyncRouteProps[], pathname?: string) {
  await Promise.all(
    routes.map(route => {
      const match = matchPath(pathname || window.location.pathname, route);
      if (match && route && route.component && route.component.load) {
        return (route.component).load();
      }
      return undefined;
    })
  );

  let data;
  if (typeof window !== undefined && !!document) {
    data = JSON.parse(
      (document as any).getElementById('server-app-state').textContent
    );
  }
  return Promise.resolve(data);
}
