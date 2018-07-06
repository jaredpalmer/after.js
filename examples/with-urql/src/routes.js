import React from 'react';
import About from './About';
import Home from './Home';

import {asyncComponent} from '@jaredpalmer/after';

export default [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/about/:id',
    exact: true,
    component: About,
  },
];
