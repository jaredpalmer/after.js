![repo-banner](https://user-images.githubusercontent.com/4060187/34948491-454de294-f9db-11e7-8fc5-86985ba05be8.png)

# After.js

If [Next.js](https://github.com/zeit/next.js) and [React Router](https://github.com/reacttraining/react-router) had a baby...

<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents**

* [Project Goals / Philosophy / Requirements](#project-goals--philosophy--requirements)
* [Getting Started](#getting-started)
* [Data Fetching](#data-fetching)
  * [`getInitialProps: (ctx) => Data`](#getinitialprops-ctx--data)
  * [Injected Page Props](#injected-page-props)
* [Routing](#routing)
  * [Parameterized Routing](#parameterized-routing)
  * [Client Only Data and Routing](#client-only-data-and-routing)
* [Code Splitting](#code-splitting)
* [Customization](#customization)
  * [Custom `<Document>`](#custom-document)
  * [Customizing Babel Config](#customizing-babel-config)
  * [Extending Webpack](#extending-webpack)
  * [Extending ESLint](#extending-eslint)
  * [Environment Variables](#environment-variables)
  * [Adding Temporary Environment Variables In Your Shell](#adding-temporary-environment-variables-in-your-shell)
    * [Windows (cmd.exe)](#windows-cmdexe)
    * [Linux, macOS (Bash)](#linux-macos-bash)
  * [Adding Environment Variables In `.env`](#adding-environment-variables-in-env)
    * [What other `.env` files are can be used?](#what-other-env-files-are-can-be-used)
* [Author](#author)
* [Inspiration](#inspiration)

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
npm i @jaredpalmer/after react-router-dom react react-dom react-helmet --save
```

In your `package.json`, add the following:

```json
{
  "scripts": {
    "start": "after start",
    "test": "after test --env=jsdom",
    "build": "after build",
    "start:prod": "NODE_ENV=production node build/build/server.js"
  }
}
```

Create a folder called `src` in your project's root. For demo purposes, create
two React components in `./src/Home.js` and `./src/About.js`

```js
// ./src/Home.js
import React from 'react';
import { NavLink } from 'react-router-dom';

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
// ./src/About.js
import React from 'react';
import { NavLink } from 'react-router-dom';

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

Now create a file `./src/_routes.js` and export an array of React Router 4
compatible `<Route component>` _objects_ that export the 2 pages we just made.

```js
// ./src/_routes.js
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

Below is a list of commands you will probably find useful.

* `npm start` or `yarn start`: Runs the project in development mode. You can view your application at `http://localhost:3000`. The page will reload if you make edits.
* `npm run build` or `yarn build`: Builds the app for production to the build folder.
* `npm run start:prod` or `yarn start:prod`: Runs the compiled app in production. You can again view your application at `http://localhost:3000`
* `npm test` or `yarn test`: Runs the test watcher (Jest) in an interactive mode. By default, runs tests related to files changed since the last commit.
* `npm start -- --inspect` or `yarn start -- --inspect`: To debug the node server, you can use `after start --inspect`. This will start the node server and enable the inspector agent. For more information, see [this](https://nodejs.org/en/docs/inspector/).
* `npm start -- --inspect-brk` or `yarn start -- --inspect-brk`: To debug the node server, you can use `after start --inspect-brk`. This will start the node server, enable the inspector agent and Break before user code starts. For more information, see [this](https://nodejs.org/en/docs/inspector/).

---

## Data Fetching

For page components, you can add a `static async getInitialProps` function.
This will be called on both initial server render, and then client mounts.
Results are made available on `this.props`.

```js
// ./src/About.js
import React from 'react';
import { NavLink } from 'react-router-dom';

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
* `location`: (client-only) React Router 4's `location` object.

### Injected Page Props

* Whatever you have returned in `getInitialProps`
* `prefetch: (pathname: string) => void` - Impertively prefetch _and cache_ data for a path. Under the hood this will map through your route tree, call the matching route's `getInitialProps`, store it, and then provide it to your page component. If the user ultimately navigates to that path, the data and component will be ready ahead of time. In the future, there may be more options to control cache behavior in the form of a function or time in milliseconds to keep that data around.
* `refetch: (nextCtx?: any) => void` - Imperatively call `getInitialProps` again

## Routing

As you have probably figured out, React Router 4 powers all of After.js's
routing. You can use any and all parts of RR4.

### Parameterized Routing

```js
// ./src/_route.js
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
// ./src/Detail.js
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
        {this.props.item ? this.props.item : 'Loading...'}
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
// ./src/_routes.js
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

While After.js comes with the battery pack included, you can customize and configure just about everything.

### Custom `<Document>`

After.js works similarly to Next.js with respect to overriding HTML document structure. This comes in handy if you are using a CSS-in-JS library or just want to collect data out of react context before or after render. To do this, create a file in `./src/_document.js` like so:

```js
// ./src/_document.js
import React from 'react';

class Document extends React.Component {
  static getInitialProps({ assets, data, renderPage }) {
    const page = renderPage();
    return { assets, data, ...page };
  }

  render() {
    const { helmet, assets, data } = this.props;
    // get attributes from React Helmet
    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const bodyAttrs = helmet.bodyAttributes.toComponent();

    return (
      <html {...htmlAttrs}>
        <head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet="utf-8" />
          <title>Welcome to the Afterparty</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          {assets.client.css && (
            <link rel="stylesheet" href={assets.client.css} />
          )}
        </head>
        <body {...bodyAttrs}>
          <div id="root">DO_NOT_DELETE_THIS_YOU_WILL_BREAK_YOUR_APP</div>
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: ` window.__AFTER__ = ${JSON.stringify(data)}; `
            }}
          />
          <script
            type="text/javascript"
            src={assets.client.js}
            defer
            crossOrigin="anonymous"
          />
        </body>
      </html>
    );
  }
}

export default Document;
```

If you were using something like `styled-components`, and you need to wrap you entire app with some sort of additional provider or function, you can do this with `renderPage()`.

```js
// ./src/_document.js
import React from 'react';
import { ServerStyleSheet } from 'styled-components'

export default class Document extends React.Component {
  static getInitialProps({ assets, data, renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { assets, data, ...page, styleTags};
  }

 render() {
    const { helmet, assets, data, styleTags } = this.props;
    // get attributes from React Helmet
    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const bodyAttrs = helmet.bodyAttributes.toComponent();

    return (
      <html {...htmlAttrs}>
        <head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet="utf-8" />
          <title>Welcome to the Afterparty</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          {/** here is where we put our Styled Components styleTags... */}
          {this.props.styleTags}
        </head>
        <body {...bodyAttrs}>
          {/** same as above... */}
        </body>
      </html>
    );
  }
```

### Customizing Babel Config

after comes with most of ES6 stuff you need. However, if you want to add your own babel transformations, just add a `.babelrc` file to the root of your project.

```js
{
  "presets": [
    "after/babel", // NEEDED
    "stage-0"
   ],
   "plugins": [
     // additional plugins
   ]
}
```

A word of advice: the `.babelrc` file will replace the internal after babelrc template. You must include at the very minimum the default after/babel preset.

### Extending Webpack

You can also extend the underlying webpack config. Create a file called `after.config.js` in your project's root.

```js
// after.config.js

module.exports = {
  modify: (config, { target, dev }, webpack) => {
    // do something to config

    return config;
  }
};
```

A word of advice: `after.config.js` is an escape hatch. However, since it's just JavaScript, you can and should publish your `modify` function to npm to make it reusable across your projects. For example, imagine you added some custom webpack loaders and published it as a package to npm as `my-after-modifictions`. You could then write your `after.config.js` like so:

```
// after.config.js
const modify = require('my-after-modifictions');

module.exports = {
  modify
}
```

Last but not least, if you find yourself needing a more customized setup, after is _very_ forkable. There is one webpack configuration factory that is 300 lines of code, and 4 scripts (`build`, `start`, `test`, and `init`). The paths setup is shamelessly taken from [create-react-app](https://github.com/facebookincubator/create-react-app), and the rest of the code related to logging.

### Extending ESLint

after comes with [Create React App's ESLint configuration](https://github.com/facebookincubator/create-react-app/tree/master/packages/eslint-config-react-app). Add a `.eslintrc` file to the root of your project to use your own configuration.

```js
{
  "extends": "react-app",
  "rules": {
    // modify default rules
  }
}
```

### Environment Variables

**The environment variables are embedded during the build time.** You can read them at runtime just because by default we export them with the `webpack.DefinePlugin`.

* `process.env.AFTER_PUBLIC_DIR`: Path to the public directory.
* `process.env.AFTER_ASSETS_MANIFEST`: Path to a file containing compiled asset outputs
* `process.env.REACT_BUNDLE_PATH`: Relative path to where React will be bundled during development. Unless you are modifying the output path of your webpack config, you can safely ignore this. This path is used by `react-error-overlay` and webpack to power up the fancy runtime error iframe. For example, if you are using common chunks and an extra entry to create a vendor bundle with stuff like react, react-dom, react-router, etc. called `vendor.js`, and you've changed webpack's output to `[name].js` in development, you'd want to set this environment variable to `/static/js/vendor.js`. If you do not make this change, nothing bad will happen, you will simply not get the cool error overlay when there are runtime errors. You'll just see them in the console. Note: This does not impact production bundling.
* `process.env.VERBOSE`: default is false, setting this to true will not clear the console when you make edits in development (useful for debugging).
* `process.env.PORT`: default is `3000`, unless changed
* `process.env.HOST`: default is `0.0.0.0`
* `process.env.NODE_ENV`: `'development'` or `'production'`
* `process.env.BUILD_TARGET`: either `'client'` or `'server'`
* `process.env.PUBLIC_PATH`: Only in used in `after build`. You can alter the `webpack.config.output.publicPath` of the client assets (bundle, css, and images). This is useful if you plan to serve your assets from a CDN. Make sure to _include_ a trailing slash (e.g. `PUBLIC_PATH=https://cdn.example.com/`). If you are using React and altering the public path, make sure to also [include the `crossorigin` attribute](https://reactjs.org/docs/installation.html#using-a-cdn) on your `<script>` tag in `./src/server.js`.

You can create your own custom build-time environment variables. They must start
with `AFTER_`. Any other variables except the ones listed above will be ignored to avoid accidentally exposing a private key on the machine that could have the same name. Changing any environment variables will require you to restart the development server if it is running.

These environment variables will be defined for you on `process.env`. For example, having an environment variable named `AFTER_SECRET_CODE` will be exposed in your JS as `process.env.AFTER_SECRET_CODE`.

### Adding Temporary Environment Variables In Your Shell

Defining environment variables can vary between OSes. It’s also important to know that this manner is temporary for the
life of the shell session.

#### Windows (cmd.exe)

```cmd
set AFTER_SECRET_CODE=abcdef&&npm start
```

(Note: the lack of whitespace is intentional.)

#### Linux, macOS (Bash)

```bash
AFTER_SECRET_CODE=abcdef npm start
```

### Adding Environment Variables In `.env`

To define permanent environment variables, create a file called .env in the root of your project:

```
AFTER_SECRET_CODE=abcdef
```

#### What other `.env` files are can be used?

* `.env`: Default.
* `.env.local`: Local overrides. **This file is loaded for all environments except test.**
* `.env.development`, `.env.test`, `.env.production`: Environment-specific settings.
* `.env.development.local`, `.env.test.local`, `.env.production.local`: Local overrides of environment-specific settings.

Files on the left have more priority than files on the right:

* `npm start`: `.env.development.local`, `.env.development`, `.env.local`, `.env`
* `npm run build`: `.env.production.local`, `.env.production`, `.env.local`, `.env`
* `npm test`: `.env.test.local`, `.env.test`, `.env` (note `.env.local` is missing)

These variables will act as the defaults if the machine does not explicitly set them.<br>
Please refer to the [dotenv documentation](https://github.com/motdotla/dotenv) for more details.

> Note: If you are defining environment variables for development, your CI and/or hosting platform will most likely need
> these defined as well. Consult their documentation how to do this. For example, see the documentation for [Travis CI](https://docs.travis-ci.com/user/environment-variables/) or [Heroku](https://devcenter.heroku.com/articles/config-vars).

## Author

* Jared Palmer [@jaredpalmer](https://twitter.com/jaredpalmer)

## Inspiration

* [Razzle](https://github.com/jaredpalmer/razzle)
* [Next.js](https://github.com/zeit/next.js)

---

MIT License
