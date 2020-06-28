import React from 'react';

import { asyncComponent } from '../../';

export default [
  {
    path: '/',
    exact: true,
    component: asyncComponent({
      loader: () => import(/* webpackChunkName: Home */ './Home'), // required
      Placeholder: () => <div>...LOADING...</div>, // this is optional, just returns null by default
      chunkName: 'Home',
    }),
  },
  {
    path: '/about',
    exact: true,
    component: asyncComponent({
      loader: () => import(/* webpackChunkName: About */ './About'), // required
      Placeholder: () => <div>...LOADING...</div>, // this is optional, just returns null by default
      chunkName: 'About',
    }),
  },
];
