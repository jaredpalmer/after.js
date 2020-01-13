import { render as renderPage } from '../render';
import { Helmet } from 'react-helmet';

import Home from './components/Home';
import NonAsyncRedirect from './components/NonAsyncRedirectComponent';
import AsyncRedirectComponent from './components/AsyncRedirectComponent';
import UserDefined404Component from './components/UserDefined404Component';
import AsyncNotFound from './components/AsyncNotFoundComponent';
import DefaultNotFoundComponent from '../NotFoundComponent';

function render({ url, ...params }) {
  return renderPage({ req: { url }, ...params });
}

describe('ErrorPage', () => {
  let res;
  const assets = { client: { css: '', js: '' } };
  Helmet.canUseDOM = false;
  const routes = [{ path: '/', exact: true, component: Home }];

  beforeEach(() => {
    res = {
      status: jest.fn(),
      redirect: jest.fn(),
    };
  });

  it('should not change response statusCode code', async () => {
    await render({ url: '/', res, routes, assets });
    expect(res.status).not.toBeCalled();
  });

  it('should set response header to 404', async () => {
    await render({ url: '/nope', res, routes, assets });
    expect(res.status).toBeCalledWith(404);
  });

  it('should set response header to 404 and show NotFound component (async)', async () => {
    const routes = [{ path: '/', component: AsyncNotFound }];
    const result = await render({ url: '/', res, routes, assets });
    expect(res.status).toBeCalledWith(404);
    expect(result).toContain(DefaultNotFoundComponent.data);
  });

  it("should redirect to '/new-location' before react render (async)", async () => {
    const routes = [
      { component: AsyncRedirectComponent, path: '/old-location' },
    ];
    const html = await render({ url: '/old-location', res, routes, assets });
    expect(res.redirect).toBeCalledWith(301, '/new-location');
    expect(html).toBeUndefined();
  });

  it("should redirect to '/new-location' after react render", async () => {
    const routes = [{ component: NonAsyncRedirect, path: '/old-location' }];
    const html = await render({ url: '/old-location', res, routes, assets });
    expect(res.redirect).toBeCalledWith(301, '/new-location');
    expect(html).toContain(NonAsyncRedirect.data);
  });

  // user can define 404 Component in three ways
  // 1) { path: "*", Component: NotFoundComponent }
  // 2) { path: "**", Component: NotFoundComponent }
  // 3) { Component: NotFoundComponent } // path is undefined

  it("should render user defined 404 Component with '*' path in routes", async () => {
    const routes = [{ component: UserDefined404Component, path: '*' }];
    const html = await render({ url: '/old-location', res, routes, assets });
    expect(res.status).toBeCalledWith(404);
    expect(html).toContain(UserDefined404Component.data);
    expect(html).not.toContain(DefaultNotFoundComponent.data);
  });

  it("should render user defined 404 Component with '**' path in routes", async () => {
    const routes = [{ component: UserDefined404Component, path: '**' }];
    const html = await render({ url: '/old-location', res, routes, assets });
    expect(res.status).toBeCalledWith(404);
    expect(html).toContain(UserDefined404Component.data);
    expect(html).not.toContain(DefaultNotFoundComponent.data);
  });

  it('should render user defined 404 Component with undefined path in routes', async () => {
    const routes = [{ component: UserDefined404Component }];
    const html = await render({ url: '/old-location', res, routes, assets });
    expect(res.status).toBeCalledWith(404);
    expect(html).toContain(UserDefined404Component.data);
    expect(html).not.toContain(DefaultNotFoundComponent.data);
  });

  it('should render after.js default 404 Component when no user defined 404 Component is available', async () => {
    const html = await render({ url: '/nope', res, routes, assets });
    expect(res.status).toBeCalledWith(404);
    expect(html).toContain(DefaultNotFoundComponent.data);
    expect(html).not.toContain(UserDefined404Component.data);
  });
});
