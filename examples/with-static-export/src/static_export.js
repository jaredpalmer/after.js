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
  return ['/', '/about', '/404'];
};
