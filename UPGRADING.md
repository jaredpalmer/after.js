# Migrating from v1 to v2

## Preamble

#### Load Assets Faster !

> Upgrading to version 2 should not take more than 10 minutes.

In v1, with `asyncComponent` you spilit part of your application into a new chunk and on BROWSER when you need that part of your code it get downloaded automatically. when page rendered on server there was no way to understand which chunks needed for current request so After.js only sends `bundle.js` and `main.css` file, then on BROWSER with `ensureReady` method it tries to fetch chunks (splitted css and js files) needed for current request. and it's slow!

#### WHY?

1. browser must download `bundle.js`, then parse it and at the end it executes the code. when code get executed `ensureReady` method get called, `ensureReady` finds and download chunks needed to render current page and when all files get downloaded it start to re-hydrate.

2. browser will render page without css styles (because we spilited them and it will get them when `ensureReady` called), this makes site look ugly for 2,3 seconds (bad UX).

3. have you ever thinked why css is render blocking ?
   if borwser find a `<link rel="stylesheet">` tag, it will stop rendering the page and waits until that style file get downloaded and parsed. this is necessary in order to have fast page render, if css files attach to dom after page get rendered browser must repaint whole page. (painting is too much job for browser and it's to slow)

in After.js 2 this problem is solved and it sends all js and css files needed for current request in inital server response. (no need for `ensureReady` anymore)

## Breaking Changes

### `ensureReady` is no longer available

there is no need to use `ensureReady` method and it's removed from After.js.

From:

```jsx
// client.js

import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ensureReady, After } from '@jaredpalmer/after';
import './client.css';
import routes from './routes';

ensureReady(routes).then(data =>
  hydrate(
    <BrowserRouter>
      <After data={data} routes={routes} />
    </BrowserRouter>,
    document.getElementById('root')
  )
);

if (module.hot) {
  module.hot.accept();
}
```

To:

```jsx
// client.js

import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { After } from '@jaredpalmer/after';
import './client.css';
import routes from './routes';

hydrate(
  <BrowserRouter>
    <After routes={routes} />
  </BrowserRouter>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
```

You can access server app state from window (`window.__SERVER_APP_STATE__`), you can modify `SERVER_APP_STATE` and pass it to `<After />` component.

```jsx
<After data={modifyData(window.__SERVER_APP_STATE__)} routes={routes} />
```

`After` component will pick `window.__SERVER_APP_STATE__` if data prop not passed.

```jsx
function After({ routes, data = window.__SERVER_APP_STATE__ }) {
  // ...
}
```

### `routes.js` config changed

In order to send assets (css and js files) from initial server response, we need to change how we define our routes.

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
    chunkName: 'whatever',
    component: asyncComponent({
      loader: () => import(/* webpackChunkName: "whatever" */ './About'),
    }),
  },
  {
    path: '/contact-us',
    exact: true,
    chunkName: 'ContactUs',
    component: asyncComponent({
      loader: () => import(/* webpackChunkName: "ContactUs" */ './Contact'),
    }),
  },
];
```

> This is too hard and complicated (and there is more things that we have to take care about) so we made a babel plugin to do this automatically because we care about you (DX).

#### Use babel plugin

Create a `.babelrc` file in root of project (next to the package.json)

```js
// .babelrc

{
  "presets": [ "razzle/babel" ],
  "plugins": [ "after-async-component" ]
}
```

> Check [after-async-component](https://github.com/nimacsoft/babel-plugin-after-async-component) repo for more options.

**by enabling plugin THERE IS NO NEED TO CHANGE your routes, and old `route.js` file works.**

#### Limitations of babel plugin

There is only one limitation, it won't work if your code looks like this:

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

to fix this just change `myTransformations` function implementaion to:

```javascript
function myTransformations(route) {
  if (!route.name) return route;
  return {
    ...route,
    chunkName: route.name,
    component: asyncComponent({
      loader: () =>
        import(
          /* webpackChunkName: "[request]" */
          `./pages/${route.name}`
        ),
    }),
  };
}
```

### Add new webpack plugin

We have to add new webpack plugin in order to get chunks information from webpack (it's called stats) and save it into a file to use it later in our application.

This is not magic but it's using webpack magic comments.

This will create a file called `manifest.json` in build directory.

to enable `razzle-plugin-manifest` create a `razzle.config.js` file in root directory of project (next to the package.json):

```javascript
// razzle.config.js

module.exports = {
  plugins: ['manifest'],
};
```

> Check [razzle-plugin-manifest](https://github.com/nimacsoft/razzle-plugin-manifest) repo for more options.

### Update server.js

Just import `manifest.json` file that webpack plugin generated for us and pass it to render. (don't panic if there is no `manifest.json` file, it will get generated once you run start or build script)

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
import manifest from '../build/manifest.json'; // <-- import manifest

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
        manifest, // <-- pass it to render method
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

### Bonus

#### Enable Gzip and Brotli Compression Algorithm to have faster page loads!

to enable compression just add `compression` to webpack plugins:

```javascript
// razzle.config.js

module.exports = {
  plugins: ['compression'],
};
```

if you used `manifest` plugin then `razzle.config.js` should look like:

```javascript
// razzle.config.js

module.exports = {
  plugins: ['manifest', 'compression'],
};
```

> Check [razzle-plugin-compression](https://github.com/nimacsoft/razzle-plugin-compression) repo for more options.

### Deprecated Features

Nothing !
