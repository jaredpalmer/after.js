import { matchPath } from 'react-router-dom';
import { AsyncRouteProps, InitialProps, AsyncRouteComponentType } from './types';
import { isAsyncComponent } from './utils';

export async function loadInitialProps(routes: AsyncRouteProps[], pathname: string, ctx: any): Promise<InitialProps> {
  const promises: Promise<any>[] = [];

  const match = routes.find((route: AsyncRouteProps) => {
    const matched = matchPath(pathname, route);

    if (matched && route.component && isAsyncComponent(route.component)) {
      const component = route.component as AsyncRouteComponentType<any>;

      promises.push(
        component.load
          ? component.load().then(() => component.getInitialProps({ matched, ...ctx }))
          : component.getInitialProps({ matched, ...ctx })
      );
    }

    return !!matched;
  });

  return {
    match,
    data: (await Promise.all(promises))[0]
  };
}
