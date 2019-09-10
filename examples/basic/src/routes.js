import React from 'react';

// babel-plugin-after-async-component will not work with this file 
// the import statment should be "@jaredpalmer/after" or "@jaredpalmer/after/asyncComponent"
import { asyncComponent } from '../../../build/asyncComponent';

export default [
  {
    path: '/',
    exact: true,
    component: asyncComponent({
      loader: () => import('./Home'), // required
      Placeholder: () => <div>...LOADING...</div>, // this is optional, just returns null by default
    }),
  },
  {
    path: '/about',
    exact: true,
    component: asyncComponent({
      loader: () => import('./About'), // required
      Placeholder: () => <div>...LOADING...</div>, // this is optional, just returns null by default
    }),
  },
];
