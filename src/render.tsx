import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';
import { RouteProps, StaticRouter } from 'react-router-dom';
import { Document } from './Document';
import { After } from './After';
import { loadInitialProps } from './loadInitialProps';
import url from 'url';

const modPageFn = (Page: React.ComponentType<any>) => (props: any) => (
  <Page {...props} />
);

export async function render({
  req,
  res,
  routes,
  assets,
  document = Document,
}: {
  req: any;
  res: any;
  assets: any;
  routes: Partial<RouteProps>[];
  document: React.ComponentType<any>;
}) {
  const { match = {}, data } = await loadInitialProps(
    routes,
    url.parse(req.url).pathname as any,
    {
      req,
      res,
    }
  );

  if (match.path === '**') {
    res.status(404);
  } else if (match.redirectTo) {
    res.redirect(301, req.originalUrl.replace(match.path, match.redirectTo));
    return;
  }
  const context = {};
  const renderPage = (fn = modPageFn) => {
    const html = ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={context}>
        {fn(After)({ routes, data })}
      </StaticRouter>
    );
    const helmet = Helmet.renderStatic();
    return { html, helmet };
  };

  const { html, ...docProps } = await Document.getInitialProps({
    req,
    res,
    assets,
    renderPage,
    data,
  });

  const doc = ReactDOMServer.renderToStaticMarkup(<Document {...docProps} />);
  return (
    `<!doctype html>` +
    doc.replace('DO_NOT_DELETE_THIS_YOU_WILL_BREAK_YOUR_APP', html)
  );
}
