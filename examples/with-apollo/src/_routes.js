import Home from './Home';
import Posts from './Posts';

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
  },
];
