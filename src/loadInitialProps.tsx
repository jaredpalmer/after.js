import { matchPath } from 'react-router-dom';
import { AsyncRouteProps, InitialProps, CtxBase } from './types';
import { isAsyncComponent } from './utils';

export async function loadInitialProps(
  routes: AsyncRouteProps[],
  pathname: string,
  ctx: CtxBase
): Promise<InitialProps> {
  const promises: Promise<any>[] = [];

  const matchedComponent = routes.find((route: AsyncRouteProps) => {
    const match = matchPath(pathname, route);

    if (match && route.component && isAsyncComponent(route.component)) {
      const component = route.component;

      promises.push(
        component.load
          ? component
              .load()
              .then(() => component.getInitialProps({ match, ...ctx }))
          : component.getInitialProps({ match, ...ctx })
      );
    }

    return !!match;
  });

  return {
    match: matchedComponent,
    data: (await Promise.all(promises))[0],
  };
}
