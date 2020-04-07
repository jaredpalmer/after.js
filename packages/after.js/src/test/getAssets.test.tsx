import { getAssets as getRouteChunks, errorMeesage } from '../getAssets';
import chunks from './chunks';
import routes from './routes';
import { matchPath } from 'react-router-dom';
import { AsyncRouteProps } from '../types';
import { asyncComponent } from '../asyncComponent';

// @ts-ignore
import logger from 'razzle-dev-utils/logger';

function getRoute(url): AsyncRouteProps {
  const matchedComponent = routes.find((route: AsyncRouteProps) => {
    // matchPath dont't accept undifined path property
    // in <Switch> componet Child <Route> default path value is an empty string
    const match = matchPath(url, { ...route, path: route.path || '' });
    return !!match;
  });

  return matchedComponent;
}

function getAssets(url, route = getRoute(url)) {
  return getRouteChunks({ route, chunks });
}

jest.mock('razzle-dev-utils/logger');

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
    expect(scripts).toEqual(chunks[chunkNameForRequestedUrl].js);
    expect(styles).toEqual(chunks[chunkNameForRequestedUrl].css);
  });

  test('should log and then throw error when chunkName is undefined and component is async', () => {
    const errorLoger = jest.fn();
    logger.error.mockImplementation(errorLoger);

    const requestUrl = '/bad-route-config';
    const route = {
      path: '/bad-route-config',
      component: asyncComponent({ loader: () => import('./components/Home') }),
    };
    expect(() => {
      getAssets(requestUrl, route);
    }).toThrow();

    expect(errorLoger).toBeCalledTimes(1);
    expect(errorLoger).toBeCalledWith(errorMeesage);
  });
});
