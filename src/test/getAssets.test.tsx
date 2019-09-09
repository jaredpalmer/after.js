import { getAssets as getRouteChunks } from '../getAssets';
import manifest from './manifest';
import routes from './routes';
import { matchPath } from 'react-router-dom';
import { AsyncRouteProps } from '../types';
import { asyncComponent } from '../asyncComponent';

function getRoute(url): AsyncRouteProps {
  const matchedComponent = routes.find((route: AsyncRouteProps) => {
    // matchPath dont't accept undifined path property
    // in <Switch> componet Child <Route> default path value is an empty string
    const match = matchPath(url, { ...route, path: route.path || '' });
    return !!match;
  })!;

  return matchedComponent;
}

function getAssets(url, route = getRoute(url)) {
  return getRouteChunks({ route, manifest });
}

describe('getAssets', () => {

  test('for non-dynamic-import route should return empty array', () => {
    const requestUrl = '/non-dynamic-import';
    const { scripts, styles } = getAssets(requestUrl);
    expect(scripts).toHaveLength(0);
    expect(styles).toHaveLength(0);
  });

  test('for a async route should return styles and scripts from manifest', () => {
    const requestUrl = '/';
    const chunkNameForRequestedUrl = 'components-Home';
    const { scripts, styles } = getAssets(requestUrl);
    expect(scripts).toEqual(manifest[chunkNameForRequestedUrl].js);
    expect(styles).toEqual(manifest[chunkNameForRequestedUrl].css);
  });

  test('should throw error in non production env when chunkName is undefined and component is async', () => {

		// change env.NODE_ENV
		const OLD_ENV = process.env;
		jest.resetModules() // this is important - it clears the cache
    process.env = { ...OLD_ENV };
    process.env.NODE_ENV = "development";

    const requestUrl = '/not-valid-route';
    const route = {
      path: '/not-valid-route',
      component: asyncComponent({ loader: () => import('./components/Home') }),
    };
    expect(() => {
      getAssets(requestUrl, route);
		}).toThrow();
		
		// restore old env
		process.env = OLD_ENV;

	});

	test('should not throw error in production env when chunkName is undefined and component is async', () => {

		// change env.NODE_ENV
		const OLD_ENV = process.env;
		jest.resetModules() // this is important - it clears the cache
    process.env = { ...OLD_ENV };
    process.env.NODE_ENV = "production";

    const requestUrl = '/not-valid-route';
    const route = {
      path: '/not-valid-route',
      component: asyncComponent({ loader: () => import('./components/Home') }),
    };
    expect(() => {
      getAssets(requestUrl, route);
		}).not.toThrow();
		
		// restore old env
		process.env = OLD_ENV;

	});
	
});
