import Home from './Home';
import About from './About';
import Contact from './Contact';

export default [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/about',
    exact: true,
    component: About,
  },
  {
    path: '/contact',
    exact: true,
    component: Contact,
  },
];
