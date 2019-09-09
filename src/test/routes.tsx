import React from 'react';

import { asyncComponent } from '../asyncComponent';
import NonDymamicImport  from './components/NonDynamicExport';
import { NoGetInitialProps } from './components/NoGetInitialProps';
import NotFoundComponent from '../NotFoundComponent';

const Placeholder = () => <div>...LOADING...</div>

export default [
  {
    path: '/',
		exact: true,
		chunkName: 'components-Home',
    component: asyncComponent({
      loader: () => import(/* webpackChunkName: 'components-Home' */ './components/Home'),
      Placeholder
    }),
  },
  {
    path: '/async-get-initial-props',
		exact: true,
		chunkName: 'components-AsyncGetInitialProps',
    component: asyncComponent({
      loader: () => import(/* webpackChunkName: 'components-AsyncGetInitialProps' */ './components/AsyncGetInitialProps'),
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
		chunkName: 'components-NoNDefaultExport',
    component: asyncComponent({
      loader: () => import(/* webpackChunkName: 'components-NoNDefaultExport' */'./components/NoNDefaultExport').then((module) => module.NonDefaultExport),
      Placeholder
    }),
  },
  {
    path: '/no-get-initial-props',
    exact: true,
    component: NoGetInitialProps
	},
	{
		path: '*',
		component:  NotFoundComponent
	},
];
