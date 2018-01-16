// import asyncComponent from '@jaredpalmer/after/asyncComponent';
// import React from 'react';
import Home from './Home';
import Posts from './Posts';
// import withData from './lib/withData';

export default [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/posts',
    exact: true,
    component: Posts,
    // component: asyncComponent({
    //   loader: () => withData(<Posts />),
    //   Placeholder: () => <div>LOADING...</div>,
    // }),
  },
];
