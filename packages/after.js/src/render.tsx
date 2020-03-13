import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { Request, Response } from 'express';
import { parse as parseUrl } from 'url';

import { StaticRouterContext } from 'react-router';
import { AsyncRouteConfig, Chunks, AfterClientData } from './types';

import { Document as DefaultDoc } from './Document';

import { loadInitialProps } from './loadInitialProps';
import { getAssets } from './getAssets';
import { createRenderer } from './createRenderer';
import { redirectOrSetStatusCode } from './redirectOrSetStatusCode';
import { renderDocument } from './renderDocument';

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
  routes: AsyncRouteConfig[];
  document?: typeof DefaultDoc;
  chunks: Chunks;
  scrollToTop?: boolean;
  customRenderer?: (element: React.ReactElement<T>) => { html: string };
}

export async function render<T>(options: AfterRenderOptions<T>) {
  const {
    req,
    res,
    routes,
    document: Document,
    customRenderer,
    chunks,
    scrollToTop = true,
    ...rest
  } = options;
  // make all variables ready
  const Doc = Document || DefaultDoc;
  const context: StaticRouterContext = {};
  const autoScrollRef = { current: scrollToTop };
  const ctx = {
    req,
    res,
    scrollToTop: autoScrollRef,
    ...rest,
  };
  const pathname = parseUrl(req.url).pathname as string;
  const afterData: AfterClientData = {
    scrollToTop: autoScrollRef,
  };

  // get data from getInitialProps
  const { data: initialData, branch } = await loadInitialProps(
    routes,
    pathname,
    ctx
  );

  // if there was a redirectTo in response just redirect user and don't continue
  const { redirectTo, statusCode } = redirectOrSetStatusCode({
    initialData,
    context,
  });
  if (redirectTo) {
    res.redirect(redirectTo, statusCode);
    return;
  }

  const data = {
    initialData,
    afterData,
  };

  const { scripts, styles } = getAssets({ branch, chunks });

  const renderPage = createRenderer({
    res,
    req,
    routes,
    data,
    context,
    renderer: customRenderer || defaultRenderer,
  });

  const { html, ...docProps } = await Doc.getInitialProps({
    req,
    res,
    data,
    renderPage,
    scripts,
    styles,
    branch,
    chunks,
    scrollToTop: autoScrollRef,
    ...rest,
  });

  const page = renderDocument({
    Doc,
    data,
    scripts,
    styles,
    chunks,
    html,
    branch,
    ...docProps,
    ...rest,
  });
  return `<!doctype html>${page}`;
}

// By default, we keep ReactDOMServer synchronous renderToString function
const defaultRenderer = (element: React.ReactElement) => ({
  html: ReactDOMServer.renderToString(element),
});
