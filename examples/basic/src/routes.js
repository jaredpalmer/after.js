import { asyncComponent } from '@jaredpalmer/after';
import App from './App';

const routes = [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: asyncComponent({ loader: () => import('./pages/home') }),
      },
      {
        path: '/about',
        component: asyncComponent({ loader: () => import('./pages/about') }),
      },
      {
        path: '/dashboard',
        component: asyncComponent({
          loader: () => import('./pages/dashboard'),
        }),
        routes: [
          {
            path: '/dashboard/user',
            component: asyncComponent({
              loader: () => import('./pages/dashboard/user'),
            }),
          },
          {
            path: '/dashboard/changepassword',
            component: asyncComponent({
              loader: () => import('./pages/dashboard/changepassword'),
            }),
          },
        ],
      },
    ],
  },
];

export default routes;
