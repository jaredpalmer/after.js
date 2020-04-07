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
      loader: () => import(`./pages/Home`),
      chunkName: 'asd',
    }),
  },
  {
    path: '/shop',
    exact: true,
    component: asyncComponent({
      loader: () => import(`./pages/${Shop}`),
    }),
  },
  {
    path: '/blog',
    exact: true,
    component: asyncComponent({
      loader: () => import(/* webpackChunkName: "SOMETHING" */ `./pages/Blog`),
      chunkName: 'Blog',
    }),
  },
  {
    component: asyncComponent({
      loader: () =>
        import(/* webpackChunkName: "NotfoundPage" */ `./pages/Notfound`),
    }),
  },
];
