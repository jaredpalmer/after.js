import { matchPath } from 'react-router-dom';
import { AfterRouteProps, InitialProps, AfterRouteComponentType, CtxBase } from './types';
import { isAfterComponent } from './utils';

export async function loadInitialProps(routes: AfterRouteProps[], pathname: string, ctx: CtxBase): Promise<InitialProps> {
  const promises: Promise<any>[] = [];

  const matchedComponent = routes.find((route: AfterRouteProps) => {
    const match = matchPath(pathname, route);

    if (match && route.component && isAfterComponent(route.component)) {
      const component = route.component as AfterRouteComponentType<any>;

      promises.push(
        component.load
          ? component.load().then(() => component.getInitialProps({ match, ...ctx }))
          : component.getInitialProps({ match, ...ctx })
      );
    }

    return !!match;
  });
  
  return {
    match: matchedComponent,
    data: (await Promise.all(promises))[0]
  };
}
