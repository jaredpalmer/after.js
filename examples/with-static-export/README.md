# Razzle x After.js x SSG (Experimental)

## How to use

Download the example [or clone the whole project](https://github.com/jaredpalmer/after.js.git):

```bash
curl https://codeload.github.com/jaredpalmer/after.js/tar.gz/master | tar -xz --strip=2 after.js-master/examples/with-static-export
cd with-static-export
```

Install it and run:

```bash
yarn install
yarn start
```

or.... with the `yarn create` command:

```bash
yarn create after-app --example with-static-export after-with-static-export
cd after-with-static-export
yarn start
```

## Idea behind the example

This is example shows how you can build static webapps with after.js and razzle.

in `static_export.js` file we export two functions.

render is an async function and it will return the html you want to save in html file. after.js has a `renderStatic` function that will take care about loading the data from static file instead of calling `getInitialProps` after exporting.

routes is an async function and should return all the pages that you want to statically generate them.

> for full documantion and advanced configurtaion visit: https://razzlejs.org/docs/static-export

```js
// ./src/static_export.js

import { renderStatic } from '@jaredpalmer/after';
import appRoutes from './routes';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const chunks = require(process.env.RAZZLE_CHUNKS_MANIFEST);

export const render = async (req, res) => {
  const { html, data } = await renderStatic({
    req,
    res,
    routes: appRoutes,
    assets,
    chunks,
  });
  res.json({ html, data });
};

export const routes = () => {
  return ['/', '/about'];
};
```

build your app by running the `build` command:

```bash
yarn build
```

and for static export run the `export` command:

```bash
yarn export
```
