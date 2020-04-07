import { matchPath, RouteProps } from 'react-router-dom';
import { AsyncRouteProps, InitialProps, CtxBase } from './types';
import { isAsyncComponent } from './utils';

export async function loadInitialProps(
  routes: AsyncRouteProps[],
  pathname: string,
  ctx: CtxBase
): Promise<InitialProps> {
  const promises: Promise<any>[] = [];

  const matchedComponent = routes.find((route: RouteProps) => {
    // matchPath dont't accept undifined path property
    // in <Switch> componet all Child <Route> components
    // have a path prop with value of "/", { path: "/" }
    // https://github.com/ReactTraining/react-router/blob/master/packages/react-router/modules/Router.js#L12
    // we get arround this problem by adding { path: "*" }
    // to route that don't have path property
    const match = matchPath(pathname, { ...route, path: route.path || '*' });

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
