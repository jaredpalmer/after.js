import { AsyncRouteProps, InitialProps, CtxBase, TRouteData } from './types';
import { isAsyncComponent, findMatchedRoute, loadRouteComponent } from './utils';

export async function loadInitialProps(
  routes: AsyncRouteProps[],
  pathname: string,
  ctx: CtxBase
) {
  const {match, route} = findMatchedRoute(routes, pathname)
  const matchedComponent = route && route.component || undefined
  if (route) {
    await loadRouteComponent(route)
  }
  const initialPropsData: TRouteData = matchedComponent && match && isAsyncComponent(matchedComponent) ? (
    await matchedComponent.getInitialProps({ match, ...ctx })
  ) : undefined
  
  return {
    match: matchedComponent,
    data: initialPropsData,
  } as InitialProps;
}
