import { matchRoutes } from 'react-router-config';
import { AsyncRouteConfig, InitialProps, CtxBase } from './types';
import { isAsyncComponent } from './utils';

export async function loadInitialProps(
  routes: AsyncRouteConfig[],
  pathname: string,
  ctx: CtxBase
): Promise<InitialProps> {
  const promises: Promise<any>[] = [];

  const branch = matchRoutes(routes, pathname);
  branch.map(({ match, route }) => {
    if (match && route.component && isAsyncComponent(route.component)) {
      const component = route.component;

      const promise = component.load
        ? component
            .load()
            .then(() => component.getInitialProps({ match, ...ctx }))
        : component.getInitialProps({ match, ...ctx });

      promises.push(promise);
    }
  });

  return {
    data: await Promise.all(promises),
    branch,
  };
}
