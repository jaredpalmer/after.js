import express from 'express';
import { render } from '@jaredpalmer/after';
import Document from './Document';
import routes from './routes';
import configureStore from './common/store/configureStore';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const chunks = require(process.env.RAZZLE_CHUNKS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {
    const store = configureStore();

    try {
      const html = await render({
        req,
        res,
        routes,
        assets,
        chunks,
        document: Document,
        store,
      });
      res.send(html);
    } catch (error) {
      console.error(error);
      res.json({ message: error.message, stack: error.stack });
    }
  });

export default server;
