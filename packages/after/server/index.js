import http from 'http';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../lib/App';
import send from 'send';
import { StaticRouter, matchPath } from 'react-router-dom';
import Router from './router';
import url from 'url';
export default class Server {
  constructor(dir) {
    this.routes = require(path.resolve('.after/pages/_routes.js')).default;
    this.router = new Router();
    this.http = http.createServer((req, res) => {
      this.run(req, res).catch(err => {
        this.renderError(req, res, err);
      });
    });
  }

  async start(port) {
    this.router.get('/_after/:path+', async (req, res, params) => {
      const path = (params.path || []).join('/');
      await this.serveStatic(req, res, path);
    });

    // this.router.get('/:path+.json', async (req, res, params) => {
    //   const path = (params.path || []).join('/');
    //   await this.renderJSON(req, res, path);
    // });

    this.router.get('/:path*', async (req, res, params) => {
      const path = (params.path || []).join('/');

      await this.render(req, res, path, port);
    });

    await new Promise((resolve, reject) => {
      this.http.listen(port, err => {
        if (err) return reject(err);
        resolve();
      });
    });
  }

  async run(req, res) {
    const fn = this.router.match(req, res);
    if (fn) {
      await fn();
    } else {
      await this.render404(req, res);
    }
  }

  async render(req, res, path, port) {
    const turl = url.parse(req.url);

    const context = {};
    let data, promise;
    this.routes.some(route => {
      const { pathname } = turl;
      const match = matchPath(pathname, route);
      if (match && route.component.getInitialProps) {
        promise = route.component.getInitialProps;
      }
      return !!match;
    });

    if (promise) {
      data = await promise({ req, res, match }).catch(() => {});
    }

    try {
      const html = ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={context}>
          <App routes={this.routes} data={data} />
        </StaticRouter>
      );
      res.end(`<!DOCTYPE html><html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
        <title>Document</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>window.__AFTER__ = ${JSON.stringify(data)};</script>
        <script type='text/javascript' src="/_after/_client.js"></script>
      </body>
      </html>`);
    } catch (error) {
      this.renderError(req, res, error);
    }
  }

  async render404(req, res) {
    res.writeHead(404);
    res.end('Not Found');
  }

  async renderError(req, res, err) {
    console.error(err);
    res.writeHead(500);
    res.end('Error');
  }

  serveStatic(req, res, pathname) {
    const p = path.resolve('.after/.after/pages', pathname);
    return new Promise((resolve, reject) => {
      send(req, p)
        .on('error', err => {
          if ('ENOENT' === err.code) {
            this.render404(req, res).then(resolve, reject);
          } else {
            reject(err);
          }
        })
        .pipe(res)
        .on('finish', resolve);
    });
  }
}
