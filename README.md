# After.js

If next.js and react-router had a baby, it'd be this.

> This is a work in progress. Checkout [issues](https://github.com/jaredpalmer/after.js/issues) to see what's coming. Still need to add HMR and overridable documents.

## Getting Started

```bash
npm i @jaredpalmer/after react-router-dom react react-dom --save
```

In your `package.json`, add the following script:

```json
{
  "scripts": {
    "start": "after build && after start"
  }
}
```

Create a folder called `pages` in your project's root. For demo purposes, create
two React components in `pages/Home.js` and `pages/About.js`

```js
// pages/Home.js
import React from 'react';
import NavLink from 'react-router-dom/NavLink';

class Home extends React.Component {
  render() {
    return (
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <h1>Home</h1>
      </div>
    );
  }
}

export default Home;
```

```js
// pages/About.js
import React from 'react';
import NavLink from 'react-router-dom/NavLink';

class About extends React.Component {
  render() {
    return (
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <h1>About</h1>
      </div>
    );
  }
}

export default About;
```

Now create a file `pages/_routes.js` and export an array of React Router 4
compatible `<Route component>` _objects_ that export the 2 pages we just made.

```js
import Home from './Home';
import About from './About';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/about',
    component: About
  }
];

export default routes;
```

Now run `npm start` and open `localhost:3000`. You'll have an SSR React / React
Router 4 application.

## Data Fetching

For page components, you can add a`static async getInitialProps` function.
This will be called on both initial server render, and then client mounts.
Results are made available on `this.props.data`.

```js
// pages/About.js
import React from 'react';
import NavLink from 'react-router-dom/NavLink';

class About extends React.Component {
  static async getInitialProps({ req, res, match }) {
    const stuff = await CallMyApi();
    return { stuff };
  }

  render() {
    return (
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <h1>About</h1>
        {this.props.data ? this.props.data.stuff : 'Loading...'}
      </div>
    );
  }
}

export default About;
```

### `getInitialProps: (ctx) => Data`

Within `getInitialProps`, you have access to all you need to fetch data on both
the client and the server:

* `req?: Request`: (server-only) A Express.js request object
* `res?: Request`: (server-only) An Express.js response object
* `match`: React Router 4's `match` object.
* `history`: React Router 4's `history` object.
* `location`: (client-only) React Router 4's `match` object.

### Injected Page Props

* `data: Data` - Whatever you have returned from `getInitialProps`
* `reload: (nextCtx?: any) => void` - Imperatively call `getInitialProps` again

## Routing

As you have probably figured out, React Router 4 powers all of After.js's
routing. You can use any and all parts of RR4.

### Parameterized Routing

```js
// pages/_route.js
import Home from './Home';
import About from './About';
import Detail from './Detail';

// Internally these will become:
// <Route path={path} exact={exact} render={props => <component {...props} data={data} />} />
const routes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/detail/:id',
    component: Detail
  }
];

export default routes;
```

```js
// pages/Detail.js
import React from 'react';
import NavLink from 'react-router-dom/NavLink';

class Detail extends React.Component {
  // Notice that this will be called for
  // /detail/:id
  // /detail/:id/more
  // /detail/:id/other
  static async getInitialProps({ req, res, match }) {
    const item = await CallMyApi(`/v1/item${match.params.id}`);
    return { item };
  }

  render() {
    return (
      <div>
        <h1>Detail</h1>
        {this.props.data ? this.props.data.item : 'Loading...'}
        <Route
          path="/detail/:id/more"
          exact
          render={() => <div>{this.props.data.item.stuff}</div>}
        />
        <Route
          path="/detail/:id/other"
          exact
          render={() => <div>{this.props.data.item.stuff}</div>}
        />
      </div>
    );
  }
}

export default Detail;
```

### Client Only Data and Routing

In some parts of your application, you may not need server data fetching at all
(e.g. settings). With After.js, you just use React Router 4 as you normally
would in client land: You can fetch data (in componentDidMount) and do routing
the same exact way.

## Example

```
git clone git@github.com:jaredpalmer/after.js.git
cd after.js
yarn install
```

open the basic example

```
cd examples/basic
yarn start
```

Open localhost:3000 and look at the `pages` directiory


