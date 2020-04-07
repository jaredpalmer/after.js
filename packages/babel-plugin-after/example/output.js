import { asyncComponent } from '@jaredpalmer/after';
const routes = [
  {
    path: '/foo',
    component: foo,
  },
  {
    path: '/',
    exact: true,
    component: asyncComponent({
      loader: () =>
        import(
          /* webpackChunkName: 'asd' */
          `./pages/Home`
        ),
      chunkName: 'asd',
    }),
  },
  {
    path: '/shop',
    exact: true,
    component: asyncComponent({
      loader: () =>
        import(
          /* webpackChunkName: '[request]' */
          `./pages/${Shop}`
        ),
      chunkName: Shop,
    }),
  },
  {
    path: '/blog',
    exact: true,
    component: asyncComponent({
      loader: () =>
        import(
          /* webpackChunkName: 'Blog' */
          `./pages/Blog`
        ),
      chunkName: 'Blog',
    }),
  },
  {
    component: asyncComponent({
      loader: () =>
        import(
          /* webpackChunkName: 'NotfoundPage' */
          `./pages/Notfound`
        ),
      chunkName: 'NotfoundPage',
    }),
  },
];
