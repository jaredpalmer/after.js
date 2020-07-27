# Razzle x After.js x SSG (Experimental)

## How to use

Download the example [or clone the whole project](https://github.com/jaredpalmer/after.js.git):

```bash
curl https://codeload.github.com/jaredpalmer/after.js/tar.gz/master | tar -xz --strip=2 after.js-master/examples/with-prerender
cd with-prerender
```

Install it and run:

```bash
yarn install
yarn start
```

or.... with the `yarn create` command:

```bash
yarn create after-app --example with-prerender after-with-prerender
cd after-with-prerender
yarn start
```

## Idea behind the example

This is example shows how you can enable experimental SSG with after.js and razzle.

In `static_export.js` you should export a function called render that basicly is a express.js handler that calls After.js render function and export a function called routes that return a list of routes or a promise that resolves to a list of routes.

```js
// ./src/sstatic_export.js

import { render as afterRender, renderStatic } from '@jaredpalmer/after';
import routes as afterRoutes from './routes';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const chunks = require(process.env.RAZZLE_CHUNKS_MANIFEST);

export const render = async (req, res) => {
  try {
    const { html, data } = await renderStatic({
      req,
      res,
      afterRoutes,
      assets,
      chunks,
    });
    res.json({ html, data });
  } catch (error) {
    res.json({ error: error.message });
  }
};

export const routes = () => {
  return ['/', '/about'];
};
```

configure razzle to work with after.js

```js
// razzle.config.js
'use strict';

module.exports = {
  experimental: {
    static_export: {
      script_replacement: '<!-- after_static_js -->',
      window_variable: 'AFTER_STATIC_ROUTES'
    },
  },
};
```

build your app by running the `build` command:

```bash
yarn build
```

and for SSG run the `export` command:

```bash
yarn export
```
