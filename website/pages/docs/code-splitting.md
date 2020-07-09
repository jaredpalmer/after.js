# Code Splitting

After.js lets you easily define lazy-loaded or code-split routes in your `routes.js` file. To do this, you'll need to modify the relevant route's `component` definition like so:

```jsx
import React from 'react';
import Home from './Home';
import { asyncComponent } from '@jaredpalmer/after';

const routes = [
  // normal route
  {
    path: '/',
    exact: true,
    component: Home,
  },
  // async route
  {
    path: '/about',
    exact: true,
    component: asyncComponent({
      loader: () => import('./About'), // required
      Placeholder: () => <div>...LOADING...</div>, // this is optional, just returns null by default
    }),
  },
];

export default routes;
```
