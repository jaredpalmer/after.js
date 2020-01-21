import React from 'react';
import express from 'express';
import { render } from '@jaredpalmer/after';
import routes from './routes';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles';
import { renderToString } from 'react-dom/server';
import theme from './theme';
import Document from './Document';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {
    const sheets = new ServerStyleSheets();

    function customRenderer(node) {
      const html = renderToString(
        sheets.collect(<ThemeProvider theme={theme}>{node}</ThemeProvider>)
      );
      // remove \r\n from css
      const css = sheets.toString();
      return { html, css: css.replace(/(\r\n|\n|\r)/gm, '') };
    }

    try {
      const html = await render({
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
      res.json({ message: error.message, stack: error.stack });
    }
  });

export default server;
