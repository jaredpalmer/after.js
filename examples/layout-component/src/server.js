import express from 'express';
import { render } from '@jaredpalmer/after';
import routes from './routes';
import Document from './Document';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const chunks = require(process.env.RAZZLE_CHUNKS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {
    try {
      const html = await render({
        req,
        res,
        routes,
        assets,
        chunks,
        document: Document,
      });
      res.send(html);
    } catch (error) {
      res.json(error);
    }
  });

export default server;
