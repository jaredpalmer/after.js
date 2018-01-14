# After.js

If Next.js and React Router 4 had a baby...

> This is a work in progress. Checkout [issues](https://github.com/jaredpalmer/after.js/issues) to see what's coming.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Project Goals / Philosophy / Requirements](#project-goals--philosophy--requirements)
- [Getting Started](#getting-started)
- [Data Fetching](#data-fetching)
  - [`getInitialProps: (ctx) => Data`](#getinitialprops-ctx--data)
  - [Injected Page Props](#injected-page-props)
- [Routing](#routing)
  - [Parameterized Routing](#parameterized-routing)
  - [Client Only Data and Routing](#client-only-data-and-routing)
- [Code Splitting](#code-splitting)
- [Customization](#customization)
- [Author](#author)
- [Inspiration](#inspiration)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Project Goals / Philosophy / Requirements

Next.js is awesome. However, its routing system isn't for me. IMHO React Router 4 is a better foundation upon which such a framework should be built....and that's the goal here:

* Routes are just components and don't / should not have anything to do with folder structure. Static route configs are fine.
* Next.js's `getInitialProps` was/is a brilliant idea.
* Route-based code-splitting should come for free or be easy to opt into.
* Route-based transitions / analytics / data loading / preloading etc. , should either come for free or be trivial to implement on your own.
* Must work well with TypeScript (i.e. without Babel)
* Generally, everything should come with the battery pack included, but be overridable.

## Getting Started

```bash
npm i @jaredpalmer/after react-router-dom react react-dom --save
```

In your `package.json`, add the following:

```json
{
  "scripts": {
    "start": "after start",
    "build": "after build"
  }
}
```

Create a folder called `src` in your project's root. For demo purposes, create
two React components in `src/Home.js` and `src/About.js`

```js
// src/Home.js
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
// src/About.js
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

Now create a file `src/_routes.js` and export an array of React Router 4
compatible `<Route component>` _objects_ that export the 2 pages we just made.

```js
// src/_routes.js
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

For page components, you can add a `static async getInitialProps` function.
This will be called on both initial server render, and then client mounts.
Results are made available on `this.props`.

```js
// src/About.js
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
        {this.props.stuff ? this.props.stuff : 'Loading...'}
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

* Whatever you have returned in `getInitialProps`
* `refetch: (nextCtx?: any) => void` - Imperatively call `getInitialProps` again

## Routing

As you have probably figured out, React Router 4 powers all of After.js's
routing. You can use any and all parts of RR4.

### Parameterized Routing

```js
// src/_route.js
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
// src/Detail.js
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

## Code Splitting

After,js lets you easily define lazy-loaded or code-split routes in your `_routes.js` file. To do this, you'll need to modify the relevant route's `component` definition like so:

```js
// src/_routes.js
import React from 'react';
import Home from './Home';
import asyncComponent from '@jaredpalmer/after/asyncComponent';

export default [
  // normal route
  {
    path: '/',
    exact: true,
    component: Home
  },
  // codesplit route
  {
    path: '/about',
    exact: true,
    component: asyncComponent({
      loader: () => import('./About'), // required
      Placeholder: () => <div>...LOADING...</div> // this is optional, just returns null by default
    })
  }
];
```

## Customization

After.js is actually just a slightly modified version of my other project [Razzle](https://github.com/jaredpalmer/razzle). To customize your After.js project (e.g. custom Babel transforms, webpack plugins, environment variables, etc.) please refer to the Razzle documentation. From a config perspective, the 2 projects are identical (even down to the `razzle.config.js` file).

## Author

* Jared Palmer [@jaredpalmer](https://twitter.com/jaredpalmer)

## Inspiration

* [Razzle](https://github.com/jaredpalmer/razzle)
* [Next.js](https://github.com/zeit/next.js)

--
MIT License
