import express from 'express';
import { render } from '@jaredpalmer/after';
import Document from '../Document';
import { mapDynamicRoutesWithComponents } from '../common/helpers/mapDynamicRoutesWithComponents';
import { CustomRoute } from '../types/Routing/Route';

const data: CustomRoute[] = [
  {
    url: '/',
    name: 'StartPage',
    pageType: 'StartPage'
  },
  {
    url: '/home',
    name: 'HomePage',
    pageType: 'HomePage'
  },
  {
    url: '/article',
    name: 'ArticlePage',
    pageType: 'ArticlePage'
  },
  {
    url: '/test',
    name: 'TestPage',
    pageType: 'TestPage'
  }
];

// @ts-ignore
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express()
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .get('/*', async (req: express.Request, res: express.Response) => {    
    const routes = mapDynamicRoutesWithComponents(data);

    try {
      const html = await render({
        req,
        res,
        routes,
        assets,
        document: Document,
        // @ts-ignore
        routing: data
      });
      res.send(html);
    } catch (error) {
      console.error(error);
      res.json({ message: error.message, stack: error.stack });
    }
});

export default server;
