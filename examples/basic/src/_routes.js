import React from 'react';
import asyncComponent from '@jaredpalmer/after/asyncComponent';
import Home from './Home';

export default [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/about',
    exact: true,
    component: asyncComponent({
      loader: () => import('./About'),
      Placeholder: () => <div>LOADING...</div>,
    }),
  },
];
