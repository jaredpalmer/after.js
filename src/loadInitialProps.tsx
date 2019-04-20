import { matchPath } from 'react-router-dom';
import { AsyncRouteProps, InitialProps, CtxBase } from './types';
import { isAsyncComponent } from './utils';

export async function loadInitialProps(routes: AsyncRouteProps[], pathname: string, ctx: CtxBase): Promise<InitialProps> {
  const matchedRoute = routes.find(
    (route) => !!route.hasOwnProperty("path") && !!matchPath(pathname, route)
  ) || routes.find(
    // if no route is found, attempt to find a fallback (not-found) route
    (route) => !route.hasOwnProperty("path")
  )
  // if this is the fallback (not-found) route, `matchPath` errors out if there is no `path`, so we use "*"
  const match = matchedRoute && matchPath(pathname, matchedRoute.path || "*")
  
  const matchedComponent = matchedRoute && matchedRoute.component || undefined
  const initialPropsData = matchedComponent && isAsyncComponent(matchedComponent) ? await (
    component.load
      ? component.load().then(() => component.getInitialProps({ match, ...ctx }))
      : component.getInitialProps({ match, ...ctx })
  ) : undefined
  
  return {
    match: matchedComponent,
    data: initialPropsData,
  };
}
