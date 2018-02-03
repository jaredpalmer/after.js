import { matchPath } from 'react-router-dom';

export default async function loadInitialProps(routes, pathname, ctx) {
  const promises = [];
  const match = routes.find(route => {
    const match = matchPath(pathname, route);
    if (match && route.component && route.component.getInitialProps) {
      promises.push(
        route.component.load
          ? route.component
              .load() // load it as well
              .then(() =>
                route.component
                  .getInitialProps({ match, ...ctx })
                  .catch(() => {})
              )
          : route.component.getInitialProps({ match, ...ctx }).catch(() => {})
      );
    }
    return match;
  });
  return {
    match,
    data: (await Promise.all(promises))[0],
  };
}
