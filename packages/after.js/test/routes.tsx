import React from 'react';

import { asyncComponent } from '../src/';
import NonDymamicImport from './components/NonDynamicExport';
import { NoGetInitialProps } from './components/NoGetInitialProps';
import NotFoundComponent from '../src/NotFoundComponent';

const Placeholder = () => <div>...LOADING...</div>;

export default [
  {
    path: '/',
    exact: true,
    component: asyncComponent({
      loader: () =>
        import(/* webpackChunkName: 'components-Home' */ './components/Home'),
      Placeholder,
      chunkName: 'components-Home',
    }),
  },
  {
    path: '/async-get-initial-props',
    exact: true,
    component: asyncComponent({
      loader: () =>
        import(
          /* webpackChunkName: 'components-AsyncGetInitialProps' */ './components/AsyncGetInitialProps'
        ),
      Placeholder,
      chunkName: 'components-AsyncGetInitialProps',
    }),
  },
  {
    path: '/non-dynamic-import',
    exact: true,
    component: NonDymamicImport,
  },
  {
    path: '/non-default-export',
    exact: true,
    component: asyncComponent({
      loader: () =>
        import(
          /* webpackChunkName: 'components-NoNDefaultExport' */ './components/NoNDefaultExport'
        ).then(module => module.NonDefaultExport),
      Placeholder,
      chunkName: 'components-NoNDefaultExport',
    }),
  },
  {
    path: '/no-get-initial-props',
    exact: true,
    component: NoGetInitialProps,
  },
  {
    path: '*',
    component: NotFoundComponent,
  },
];
