import { matchPath } from 'react-router-dom';

export default function loadInitialProps(routes, pathname, ctx) {
  return Promise.all(routes.filter(route => {
    const match = matchPath(pathname, route);
    if (!match || !route.component.getInitialProps) return false
    return true
  })
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
