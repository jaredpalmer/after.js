import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';
import { matchPath, RouteProps, StaticRouter } from 'react-router-dom';
import { Document as DefaultDoc } from './Document';
import { After } from './After';
import { loadInitialProps } from './loadInitialProps';
import * as utils from './utils';
import * as url from 'url';
import { Request, Response } from 'express';
import { Assets } from './types';

const modPageFn = function<Props>(Page: React.ComponentType<Props>) {
  return (props: Props) => <Page {...props} />;
};

/*
 The customRenderer parameter is a (potentially async) function that can be set to return more than just a rendered string.
 If present, it will be used instead of the default ReactDOMServer renderToString function.
 It has to return an object of shape { html, ... }, in which html will be used as the rendered string
 Other props will be also pass to the Document component
  */
export type AfterRenderProps<T> = T & {
  req: Request;
  res: Response;
  assets: Assets;
  routes: Partial<RouteProps>[];
};

export async function render<T>(options: AfterRenderProps<T>) {
  const { req, res, routes, assets, document: Document, customRenderer, ...rest } = options as any;
  const Doc = Document || DefaultDoc;
  const context = {};
  const renderPage = async (fn = modPageFn) => {
    // By default, we keep ReactDOMServer synchronous renderToString function
    const defaultRenderer = (element: React.ReactElement<T>) => ({ html: ReactDOMServer.renderToString(element) });
    const renderer = customRenderer || defaultRenderer;
    const asyncOrSyncRender = renderer(
      <StaticRouter location={req.url} context={context}>
        {fn(After)({ routes, data })}
      </StaticRouter>
    );

    const renderedContent = utils.isPromise(asyncOrSyncRender) ? await asyncOrSyncRender : asyncOrSyncRender;
    const helmet = Helmet.renderStatic();

    return { helmet, ...renderedContent };
  };

  const { match, data } = await loadInitialProps(routes, url.parse(req.url).pathname as string, {
    req,
    res,
    ...rest
  });

  if (!match) {
    res.status(404);
    return;
  }

  if (match.path === '**') {
    res.status(404);
  } else if (match && match.redirectTo) {
    res.redirect(301, req.originalUrl.replace(match.path, match.redirectTo));
    return;
  }

  const reactRouterMatch = matchPath(req.url, match);

  const { html, ...docProps } = await Doc.getInitialProps({
    req,
    res,
    assets,
    renderPage,
    data,
    ...rest,
    match: reactRouterMatch
  });

  const doc = ReactDOMServer.renderToStaticMarkup(<Doc {...docProps} />);
  return `<!doctype html>${doc.replace('DO_NOT_DELETE_THIS_YOU_WILL_BREAK_YOUR_APP', html)}`;
}
