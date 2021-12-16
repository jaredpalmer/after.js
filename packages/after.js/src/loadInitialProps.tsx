import { matchPath, RouteProps } from 'react-router-dom';
import { AsyncRouteProps, InitialProps, CtxBase } from './types';
import { isAsyncComponent } from './utils';

const PAGE_DATA_FILE_NAME = 'page-data.json';

export async function loadInitialProps(
  pathname: string,
  routes: AsyncRouteProps[],
  ctx: CtxBase,
  ssg = false
): Promise<InitialProps> {
  const promises: Promise<any>[] = [];

  const matchedComponent = routes.find((route: RouteProps) => {
    // matchPath don't accept undefined path property
    // in <Switch> component all Child <Route> components
    // have a path prop with value of "/", { path: "/" }
    // https://github.com/ReactTraining/react-router/blob/master/packages/react-router/modules/Router.js#L12
    // we get around this problem by adding { path: "*" }
    // to route that don't have path property
    const match = matchPath(pathname, { ...route, path: route.path || '*' });

    if (match && route.component && isAsyncComponent(route.component)) {
      const component = route.component;

      if (ssg) {
        const PAGE_DATA_FILE_PATH = `${
          pathname === '/' ? '' : pathname
        }/${PAGE_DATA_FILE_NAME}`;

        promises.push(
          Promise.all([fetch(PAGE_DATA_FILE_PATH), component.load?.()])
            .then(([res]) => (res.status === 200 && res.json()) || null)
            .then(res =>
              component.getStaticInitialProps({ match, data: res, ...ctx })
            )
        );
      } else {
        promises.push(
          component.load
            ? component
                .load()
                .then(() => component.getInitialProps({ match, ...ctx }))
            : component.getInitialProps({ match, ...ctx })
        );
      }
    }

    return !!match;
  });

  return {
    match: matchedComponent,
    data: (await Promise.all(promises))[0],
  };
}
