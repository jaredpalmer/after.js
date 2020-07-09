# Routing

### Parameterized Routing

As you have probably figured out, React Router powers all of After.js's
routing. You can use any and all parts of React Router.

```js
// routes.js

import Home from './Home';
import About from './About';
import Detail from './Detail';

// Internally these will become:
// <Route path={path} exact={exact} render={props => <component {...props} {...data} />} />
const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: '/detail/:id',
    component: Detail,
  },
];

export default routes;
```

```jsx
// Detail.js
import React from 'react';
import { Route } from 'react-router-dom';

function Detail() {
  return (
    <div>
      <h1>Detail</h1>
      {this.props.item}
      <Route
        path="/detail/:id/more"
        exact
        render={() => <div>{this.props.item.more}</div>}
      />
      <Route
        path="/detail/:id/other"
        exact
        render={() => <div>{this.props.item.other}</div>}
      />
    </div>
  );
}

// Notice that this will be called for
// /detail/:id
// /detail/:id/more
// /detail/:id/other
Detail.getInitialProps = async ({ req, res, match }) => {
  const item = await CallMyApi(`/v1/item/${match.params.id}`);
  return { item };
};

export default Detail;
```

### Client Only Data and Routing

In some parts of your application, you may not need server data fetching at all (e.g. settings). With After.js, you just use React Router 4 as you normally would in client land: You can fetch data (in componentDidMount or useEffect) and do routing the same exact way.
