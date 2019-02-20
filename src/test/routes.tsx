import React from 'react';

import { asyncComponent } from '../asyncComponent';
import NonDymamicImport  from './components/NonDynamicExport';
import { NoGetInitialProps } from './components/NoGetInitialProps';

const Placeholder = () => <div>...LOADING...</div>

export default [
  {
    path: '/',
    exact: true,
    component: asyncComponent({
      loader: () => import('./components/Home'),
      Placeholder
    }),
  },
  {
    path: '/async-get-initial-props',
    exact: true,
    component: asyncComponent({
      loader: () => import('./components/AsyncGetInitialProps'),
      Placeholder
    }),
  },
  {
    path: '/non-dynamic-import',
    exact: true,
    component: NonDymamicImport
  },
  {
    path: '/non-default-export',
    exact: true,
    component: asyncComponent({
      loader: () => import('./components/NoNDefaultExport').then((module) => module.NonDefaultExport),
      Placeholder
    }),
  },
  {
    path: '/no-get-initial-props',
    exact: true,
    component: NoGetInitialProps
  },
  {
    path: '/route',
    component: asyncComponent({
      loader: () => import('./components/RootRoute'),
      Placeholder
    }),
    routes: [{
      path: '/route/nested',
      component: asyncComponent({
        loader: () => import('./components/NestedRoute'),
        Placeholder
      }),
    }]
  },
];
