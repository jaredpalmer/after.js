import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';
import { matchPath, StaticRouter, RouteProps } from 'react-router-dom';
import { Document as DefaultDoc } from './Document';
import { After } from './After';
import { loadInitialProps } from './loadInitialProps';
import * as utils from './utils';
import * as url from 'url';
import { Request, Response } from 'express';
import { Assets, AsyncRouteProps, manifest } from './types';
import { StaticRouterContext } from "react-router"
import { getAssets } from "./getAssets";

const modPageFn = function<Props>(Page: React.ComponentType<Props>) {
  return (props: Props) => <Page {...props} />;
};

/*
 The customRenderer parameter is a (potentially async) function that can be set to return 
 more than just a rendered string.
 If present, it will be used instead of the default ReactDOMServer renderToString function.
 It has to return an object of shape { html, ... }, in which html will be used as the rendered string
 Other props will be also pass to the Document component
  */
export interface AfterRenderOptions<T> {
  req: Request;
  res: Response;
  assets: Assets;
  routes: AsyncRouteProps[];
	document?: typeof DefaultDoc;
	manifest: manifest
  customRenderer?: (element: React.ReactElement<T>) => { html: string };
}

export async function render<T>(options: AfterRenderOptions<T>) {
  const { req, res, routes: pureRoutes, assets, document: Document, customRenderer, manifest, ...rest } = options;
	const Doc = Document || DefaultDoc;

	const routes = utils.getAllRoutes(pureRoutes);

  const context: StaticRouterContext = {};
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
		
		const { statusCode, url: redirectTo } = context;

		if (redirectTo) {
			res.redirect(statusCode || 301, redirectTo);
		}
	
		if (statusCode) {
			res.status(statusCode);
		}

    return { helmet, ...renderedContent };
  };

  const { match, data } = await loadInitialProps(routes, url.parse(req.url).pathname as string, {
    req,
    res,
    ...rest
  });

	
	if (data) {
		const { redirectTo, statusCode} = data as { statusCode?: number, redirectTo?: string };

		if (statusCode) {
			context.statusCode = statusCode;
		}
		
		if (redirectTo) {
			res.redirect(statusCode || 301, redirectTo);
			return;
		}
	}

	if (match && match.redirectTo && match.path) {
    res.redirect(301, req.originalUrl.replace(match.path, match.redirectTo));
    return;
  }

	const reactRouterMatch = matchPath(req.url, match as RouteProps);

	const prefix =
	process.env.NODE_ENV === "production"
		? "/"
		: `http://${process.env.HOST || "localhost"}:${parseInt(process.env.PORT!, 10) + 1}/`
	
	const { scripts, styles } = getAssets({ route: match, manifest })
  const { html, ...docProps } = await Doc.getInitialProps({
    req,
    res,
    assets,
    renderPage,
    data,
    helmet: Helmet.renderStatic(),
    match: reactRouterMatch,
    scripts,
    styles,
    prefix,
    ...rest
  });

  const doc = ReactDOMServer.renderToStaticMarkup(<Doc {...docProps} />);
  return `<!doctype html>${doc.replace('DO_NOT_DELETE_THIS_YOU_WILL_BREAK_YOUR_APP', html)}`;
}
