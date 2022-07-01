# Migrating from v2 to v3

Upgraded react-helmet from version 5 to 6

## Update Dependencies

```bash
yarn upgrade @jaredpalmer/after react-helmet --latest
```

or

```bash
npm install @jaredpalmer/after@latest react-helmet@latest --save
```

## Breaking Changes

there is no breaking change with after.js itself.
but one of the dependencies (`react-helmet`) released a new version and they changed default export to a named export.

from:

```js
import Helmet from 'react-helmet';
```

to:

```js
import { Helmet } from "react-helmet;
```

# Migrating from v1 to v2

## Preamble

#### Load Assets Faster!

> Upgrading to version 2 should not take more than 10 minutes.

In v1, with `asyncComponent` you split part of your application into a new chunk and on BROWSER when you need that part of your code it gets downloaded automatically. when page rendered on the server there was no way to understand which chunks needed for the current request so After.js only sends `client.js` and `styles.css` file, then on BROWSER with `ensureReady` method it tries to fetch chunks (split CSS and JS files) needed for the current request. and it's slow!

#### WHY?

1. browser must download `client.js`, then parse it and at the end, it executes the code. when code gets executed `ensureReady` method gets called, `ensureReady` finds and download chunks needed to render the current page and when all files get downloaded it start to re-hydrate.

2. browser will render the page without CSS styles (because we split them and it will get them when `ensureReady` called), this makes the site look ugly for 2,3 seconds (bad UX).

3. have you ever think about why CSS is render blocking?
   if browser finds a `<link rel="stylesheet">` tag, it would stop rendering page and waits until CSS file be downloaded and parsed completely (this mechanism is necessary to have fast page renders), if CSS files attach to dom after page gets rendered, the browser must repaint the whole page. (painting is too much job for browser and it's slow)

in After.js 2 this problem is solved and it sends all JS and CSS files needed for current request in the initial server response.

## Update Dependencies

```bash
yarn upgrade @jaredpalmer/after razzle --latest
```

or

```bash
npm install @jaredpalmer/after@latest razzle@latest --save
```

## Breaking Changes

### Add `babel-plugin-after` to your babel configuration

Create a `.babelrc` file in the root of the project (next to the package.json)

```js
// .babelrc

{
  "presets": [ "razzle/babel" ],
  "plugins": [ "after" ]
}
```

> Check [babel-plugin-after](https://github.com/jaredpalmer/after.js/packages/babel-plugin-after) repo for more options.

### Update `server.js`

Import `chunks.json` file that razzle will generate for us and pass it as a parameter to render method.

From:

```jsx
// server.js
import express from 'express';
import { render } from '@jaredpalmer/after';
import routes from './routes';
import MyDocument from './Document';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {
    try {
      // Pass document in here.
      const html = await render({
        req,
        res,
        document: MyDocument,
        routes,
        assets,
      });
      res.send(html);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  });

export default server;
```

To:

```jsx
// server.js

import express from 'express';
import { render } from '@jaredpalmer/after';
import routes from './routes';
import MyDocument from './Document';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const chunks = require(process.env.RAZZLE_CHUNKS_MANIFEST); // 👈 import chunks.json

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {
    try {
      // Pass document in here.
      const html = await render({
        req,
        res,
        document: MyDocument,
        chunks, // 👈 pass it to render method
        routes,
        assets,
      });
      res.send(html);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  });

export default server;
```

### Update `Document.js` (only if you used Custom `Document`)

if you defined custom `document.js` in `server.js` you should get scripts and styles from props and then loop through them

From:

```jsx
// Document.js

import React from 'react';
import { AfterRoot, AfterData } from '@jaredpalmer/after';

class Document extends React.Component {
  static async getInitialProps({ assets, data, renderPage }) {
    const page = await renderPage();
    return { assets, data, ...page };
  }

  render() {
    const { helmet, assets, data } = this.props;

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
          <AfterRoot />
          <AfterData data={data} />
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

To:

```jsx
// Document.js

import React from 'react';
import {
  AfterRoot,
  AfterData,
  AfterScripts,
  AfterStyles,
} from '@jaredpalmer/after';

class Document extends React.Component {
  static async getInitialProps({ renderPage }) {
    const page = await renderPage();
    return { ...page };
  }

  render() {
    const { helmet } = this.props;

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
          <AfterStyles />
        </head>
        <body {...bodyAttrs}>
          <AfterRoot />
          <AfterData />
          <AfterScripts />
        </body>
      </html>
    );
  }
}

export default Document;
section;
```

### Top Level API Changes (Skip this if you used `babel-plugin-after`)

To send assets (CSS and JS files) from the initial server response, we need to change how we define our routes.

From:

```jsx
// routes.js

import Home from './Home';
import { asyncComponent } from '@jaredpalmer/after';

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
    }),
  },
  {
    path: '/contact-us',
    exact: true,
    component: asyncComponent({
      loader: () => import('./Contact'),
    }),
  },
];
```

To:

```jsx
// routes.js

import Home from './Home';
import { asyncComponent } from '@jaredpalmer/after';

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
      loader: () => import(/* webpackChunkName: "whatever" */ './About'),
      chunkName: 'whatever',
    }),
  },
  {
    path: '/contact-us',
    exact: true,
    component: asyncComponent({
      loader: () => import(/* webpackChunkName: "ContactUs" */ './Contact'),
      chunkName: 'ContactUs',
    }),
  },
];
```

we call this code block "`/* webpackChunkName: "" */`" a magic comment, with magic comments we have more control over webpack compilation process. as you may already know webpack job is to merge all of our JS files into one file so we can easily send that one file to our users (same thing applies for CSS files).

with dynamic import syntax `import()` we can split our CSS and JS files into multiple files and load them whenever we need them, we call these files chunks.

when we use `/* webpackChunkName: "HomePage" */` inside `import()` statement, we tell webpack to give that chunk a name (in this example the created chunk name is **HomePage.js**) and all of this happens in build time so we don't have access to chunkNames in runtime.
after.js needs to know `chunkName` on every request. to access chunkName in run time you have to specify `chunkName` property inside `asyncComponent` with the exact value of `webpackChunkName` magic comment.

there is one more thing that we have to take care about. if you use the same component in different routes, `webpackChunkName` and `chunkName` values must be the same in all of them.

```jsx
[
  {
    path: '/shop/:filter([A-Za-z-]+)', // 👈 different routes
    exact: true,
    component: asyncComponent({
      loader: () => import(`pages/Shop`), // 👈 same components
    }),
  },
  {
    path: '/shop/:page([0-9]+)?', // 👈 different routes
    exact: true,
    component: asyncComponent({
      loader: () => import(`pages/Shop`), // 👈 same components
    }),
  },
];
```

✅ The right way to handle it:

```jsx
[
  {
    path: '/shop/:filter([A-Za-z-]+)',
    exact: true,
    component: asyncComponent({
      loader: () => import(/* webpackChunkName: "pages-Shop" */ `pages/Shop`),
      chunkName: 'pages-Shop', // 👈  names are identical 👆
    }),
  },
  {
    path: '/shop/:page([0-9]+)?',
    exact: true,
    component: asyncComponent({
      loader: () => import(/* webpackChunkName: "pages-Shop" */ `pages/Shop`),
      chunkName: 'pages-Shop', // 👈  names are identical 👆 and they match with the previous route
    }),
  },
];
```

This is too hard and complicated so we made a babel plugin to do this automatically because we care about Developer Experience. (using this plugin is optional)

### Install and Load babel plugin after

Create a `.babelrc` file in the root of the project (next to the package.json)

```js
// .babelrc

{
  "presets": [ "razzle/babel" ],
  "plugins": [ "after" ]
}
```

> Check [babel-plugin-after](https://github.com/jaredpalmer/after.js/packages/babel-plugin-after) repo for more options.

**by using the Babel plugin THERE IS NO NEED TO CHANGE your routes, and your current `routes.js` file works fine.**

#### Limitations of the Babel plugin

There is a limitation with babel plugin, code below won't work with Babel plugin:

```jsx
import Home from './Home';
import { asyncComponent } from '@jaredpalmer/after';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/about',
    exact: true,
    name: "About",
    }),
  },
  {
    path: '/contact-us',
    exact: true,
    name: "Contact",
  }
];

// 📦 this function will add components to our routes
function myTransformations(route) {
  if (!route.name) return route
  return {
    ...route,
    component: asyncComponent({
      loader: () => import(`./pages/${route.name}`)
    }),
  }
}

export default routes.map(myTransformations)
```

The Babel plugin is not going to detect above pattern, to fix this just change `myTransformations` function implementaion to:

```javascript
function myTransformations(route) {
  if (!route.name) return route;
  return {
    ...route,
    component: asyncComponent({
      loader: () =>
        import(
          /* webpackChunkName: "[request]" */ // 👈 add webpackChunkName: "[request]"
          `./pages/${route.name}`
        ),
      chunkName: route.name, // 👈 add chunkName
    }),
  };
}
```

> for more details visit [babel-plugin README](https://github.com/jaredpalmer/after.js/packages/babel-plugin-after#how-its-wokring)

### Deprecated Features

Nothing!
