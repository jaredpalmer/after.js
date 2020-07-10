# Razzle x After.js x SSG (Experimental)

## How to use

Download the example [or clone the whole project](https://github.com/jaredpalmer/after.js.git):

```bash
curl https://codeload.github.com/jaredpalmer/after.js/tar.gz/master | tar -xz --strip=2 razzle-master/examples/with-prerender
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

you should define your app routes inside the routes.json in root of your project:

```js
// ./routes.js

['/', '/about'];
```

and in `server.js` you should export a function called render that basicly is a express.js hanlder that calls After.js render function.

```js
// ./src/server.js

import express from 'express';
import { render as afterRender } from '@jaredpalmer/after';
import routes from './routes';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const chunks = require(process.env.RAZZLE_CHUNKS_MANIFEST);

export const render = async (req, res) => {
  try {
    const html = await afterRender({
      req,
      res,
      routes,
      assets,
      chunks,
    });
    res.send(html);
  } catch (error) {
    console.error(error);
    res.json({ message: error.message, stack: error.stack });
  }
};

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', render);

export default server;
```

build your app by running the `build` command:

```bash
yarn build
```

and for SSG run the `prerender` command:

```bash
yarn prerender
```
