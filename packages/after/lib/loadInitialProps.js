import { matchPath } from 'react-router-dom';

export default function loadInitialProps(routes, pathname, ctx) {
    const match = matchPath(pathname, route);

  return Promise.all(
    routes
      .filter(route => match && route.component.getInitialProps))
      .map(route => route.component.load
        ? route.component
          .load() // load it as well
          .then(() =>
            route.component
              .getInitialProps({ match, ...ctx })
              .catch(() => { })
          )
        : route.component.getInitialProps({ match, ...ctx }).catch(() => { }))
  )
}
