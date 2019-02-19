import { matchRoutes, MatchedRoute } from 'react-router-config';
import { match as Match} from 'react-router';
import { AsyncRouteProps, InitialProps, CtxBase } from './types';
import { isAsyncComponent } from './utils';

export async function loadInitialProps(routes: AsyncRouteProps[], pathname: string, ctx: CtxBase): Promise<InitialProps> {
  const promises: Promise<any>[] = [];
  const matchedRoutes = matchRoutes(routes, pathname);
  matchedRoutes.forEach((matched: MatchedRoute<{}>) => {
    const { match, route } = matched
    if (route.component && isAsyncComponent(route.component)) {
      const component = route.component;

      promises.push(
        component.load
          ? component.load().then(() => component.getInitialProps({ match, ...ctx }))
          : component.getInitialProps({ match, ...ctx })
      );
    }
  });
  const matchedRoute = matchedRoutes.length ? matchedRoutes[0].route : null
  const matchedMatch = matchedRoutes.length ? matchedRoutes[0].match : null

  return {
    route: matchedRoute as AsyncRouteProps,
    match: matchedMatch as Match<{}>,
    data: (await Promise.all(promises))[0]
  };
}
