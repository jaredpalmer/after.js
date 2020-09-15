import { render as afterRender } from '@jaredpalmer/after';
import afterRoutes from './routes';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const chunks = require(process.env.RAZZLE_CHUNKS_MANIFEST);

export const render = async (req, res) => {
  try {
    const { html, data } = await afterRender({
      req,
      res,
      routes: afterRoutes,
      ssg: true,
      assets,
      chunks,
    });

    res.json({ html, data });
  } catch (error) {
    res.json({ error: error.message });
  }
};

export const routes = () => {
  return ['/', '/about']; // always add starting slash
};
