import React from 'react';
import express from 'express';
import { render } from '@jaredpalmer/after';
import { renderToString } from 'react-dom/server';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import routes from './routes';
import createApolloClient from './createApolloClient';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {
    const client = createApolloClient({ ssrMode: true });

    const customRenderer = node => {
      const App = <ApolloProvider client={client}>{node}</ApolloProvider>;
      return getDataFromTree(App).then(() => {
        const initialState = client.extract();
        const html = renderToString(App);
        const preHydrate = () =>
          `window.__APOLLO_STATE__=${JSON.stringify(initialState).replace(
            /</g,
            '\\u003c'
          )};`;
        return { html, preHydrate };
      });
    };

    try {
      const html = await render({
        req,
        res,
        routes,
        assets,
        customRenderer,
      });
      res.send(html);
    } catch (error) {
      res.json(error);
    }
  });

export default server;
