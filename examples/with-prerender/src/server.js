import express from 'express';
import { render as afterRender, renderStatic } from '@jaredpalmer/after';
import routes from './routes';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const chunks = require(process.env.RAZZLE_CHUNKS_MANIFEST);

export const render = async (req, res) => {
  try {
    const { html, data } = await renderStatic({
      req,
      res,
      routes,
      assets,
      chunks,
    });
    return { html, data };
  } catch (error) {
    return { error: error.message };
  }
};

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {
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
  });

export default server;
