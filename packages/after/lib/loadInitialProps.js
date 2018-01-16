import { matchPath } from 'react-router-dom';

export default function loadInitialProps(routes, pathname, ctx) {
  return Promise.all(
    routes
      .map(route => ({...route, match: matchPath(pathname, route) }))
      .filter(route => route.match && route.component.getInitialProps))
      .map(({match, ...route}) => route.component.load
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
