import { loadInitialProps } from '../loadInitialProps';
import routes from './routes';
import createMemoryHistory from 'history/createMemoryHistory';
import { History } from 'history'

describe('loadInitialProps', () => {
  let history: History;

  beforeEach(() => {
    history = createMemoryHistory();
  })

  it('should find matched component and call getInitialProps', async () => {
    const url = '/'

    const matched = await loadInitialProps(routes, url, { history });
    const expected = routes.find(r => r.path === url);

    expect(matched.route).toEqual(expected);
    expect(matched.match).toEqual({
      isExact: matched.route.exact,
      path: matched.route.path,
      url: matched.route.path,
      params: {}
    });
    expect(matched.data).toEqual({ stuff: 'home stuffs' });
  });


  it('should retrieve initial props from async call', async () => {
    const url = '/async-get-initial-props';

    const matched = await loadInitialProps(routes, url, { history });

    expect(matched.route.path).toBe(url);

    expect(matched.data).toEqual({ stuff: 'async call' });
  });

  it('should call getInitialProps for non dynamic import component', async () => {
    const url = '/non-dynamic-import';

    const matched = await loadInitialProps(routes, url, { history });

    expect(matched.route.path).toBe(url);

    expect(matched.data).toEqual({ stuff: 'non dynamic export' });
  });

  it('should call getInitialProps for non default export component', async () => {
    const url = '/non-default-export';

    const matched = await loadInitialProps(routes, url, { history });

    expect(matched.route.path).toBe(url);

    expect(matched.data).toEqual({ stuff: 'non default export' });
  });

  it('should load component with no getInitialProps', async () => {
    const url = '/no-get-initial-props';

    const matched = await loadInitialProps(routes, url, { history });

    expect(matched.route.path).toBe(url);

    expect(matched.data).toBeUndefined();
  });

  it('should call getInitialProps for nested routes components', async () => {
    const url = '/route/nested';

    const matched = await loadInitialProps(routes, url, { history });

    console.log(matched.data)
    // expect(matched.route.path).toBe(url);

    expect(matched.data).toEqual({ stuff: 'root route' });
  });
})