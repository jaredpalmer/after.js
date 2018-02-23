import React from 'react';
import express from 'express';
import { render } from '@jaredpalmer/after';
import { renderToString as rdd } from 'react-dom/server';
import { ApolloProvider, renderToStringWithData } from 'react-apollo';
import routes from './routes';
import createApolloClient from './createApolloClient';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {
    const client = createApolloClient({ ssrMode: true });

    const renderToString = node =>
      renderToStringWithData(
        <ApolloProvider client={client}>{node}</ApolloProvider>
      );

    try {
      const html = await render({
        req,
        res,
        routes,
        assets,
        renderToString,
        // Anything else you add here will be made available
        // within getInitialProps(ctx)
        // e.g a redux store...
        customThing: 'thing',
      });
      res.send(html);
    } catch (error) {
      res.json(error);
    }
  });

export default server;
