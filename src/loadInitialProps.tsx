import { matchPath } from 'react-router-dom';
import { AsyncRouteProps, InitialProps } from './types';

export async function loadInitialProps(routes: AsyncRouteProps[], pathname: string, ctx: any): Promise<InitialProps> {
  const promises: Promise<any>[] = [];

  const match = routes.find((route: AsyncRouteProps) => {
    const matched = matchPath(pathname, route);

    if (matched && route.component && route.component.getInitialProps) {
      promises.push(
        route.component.load
          ? route.component.load().then(() => route.component.getInitialProps({ matched, ...ctx }))
          : route.component.getInitialProps({ matched, ...ctx })
      );
    }

    return !!matched;
  });

  return {
    match,
    data: (await Promise.all(promises))[0]
  };
}
