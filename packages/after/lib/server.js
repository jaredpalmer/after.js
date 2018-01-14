import App from './_app';
import routes from './_routes';
import loadInitialProps from './loadInitialProps';
import React from 'react';
import url from 'url';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import { StaticRouter } from 'react-router-dom';
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {
    try {
      const context = {};
      const data = await loadInitialProps(routes, url.parse(req.url).pathname, {
        req,
        res,
      });

      const markup = ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={context}>
          <App routes={routes} data={data[0]} />
        </StaticRouter>
      );

      res.send(
        `<!doctype html>
      <html lang="">
      <head>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet='utf-8' />
          <title>Welcome to Razzle</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          ${
            assets.client.css
              ? `<link rel="stylesheet" href="${assets.client.css}">`
              : ''
          }
           ${
             process.env.NODE_ENV === 'production'
               ? `<script src="${assets.client.js}" defer></script>`
               : `<script src="${assets.client.js}" defer crossorigin></script>`
           }
      </head>
      <body>
          <div id="root">${markup}</div>
          <script>window.__AFTER__ = ${JSON.stringify(data[0])};</script>
      </body>
  </html>`
      );
    } catch (error) {
      res.json(error);
    }
  });

export default server;
