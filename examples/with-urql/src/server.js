import express from 'express';
import {render} from '@jaredpalmer/after';
import {renderToString} from 'react-dom/server';
import routes from './routes';
import Document from './Document';
import createUrqlClient from './createUrqlClient';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {
    const urql = createUrqlClient({ssrMode: true});

    const customRenderer = node => {
      const html = renderToString(node);
      return {html, initialUrqlStore: urql.store};
    };

    try {
      const html = await render({
        urql,
        req,
        res,
        routes,
        assets,
        customRenderer,
        document: Document,
      });
      res.send(html);
    } catch (error) {
      console.error(error);
      res.json({error: error.message, stack: error.stack});
    }
  });

export default server;
