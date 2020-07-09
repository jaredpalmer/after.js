# Custom/Async Rendering

You can provide a custom (potentially async) rendering function as an option to After.js `render` function.

If present, it will be used instead of the default ReactDOMServer renderToString function.

It has to return an object of shape `{ html : string!, ...otherProps }`, in which `html` will be used as the rendered string

Thus, setting `customRenderer = (node) => ({ html: ReactDOMServer.renderToString(node) })` is the the same as default option.

`otherProps` will be passed as props to the rendered Document

Example :

```js
// ./src/server.js
import React from 'react';
import express from 'express';
import { render } from '@jaredpalmer/after';
import { renderToString } from 'react-dom/server';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import routes from './routes';
import createApolloClient from './createApolloClient';
import Document from './Document';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const chunks = require(process.env.RAZZLE_CHUNKS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {
    const client = createApolloClient({ ssrMode: true });

    const customRenderer = node => {
      const App = <ApolloProvider client={client}>{node}</ApolloProvider>;
      return getDataFromTree(App).then(() => {
        const initialApolloState = client.extract();
        const html = renderToString(App);
        return { html, initialApolloState };
      });
    };

    try {
      const html = await render({
        req,
        res,
        routes,
        assets,
        chunks,
        customRenderer,
        document: Document,
      });
      res.send(html);
    } catch (error) {
      console.error(error);
      res.json({ message: error.message, stack: error.stack });
    }
  });

export default server;
```
