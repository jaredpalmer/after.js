import React from 'react';
import Helmet from 'react-helmet';
import { StaticRouter } from 'react-router-dom';
import { Request, Response } from 'express';
import { AsyncRouteConfig } from './types';
import { StaticRouterContext } from 'react-router';
import { renderRoutes } from 'react-router-config';

export interface AfterCreateRendererOptions {
  res: Response;
  req: Request;
  routes: AsyncRouteConfig[];
  data: any;
  context: StaticRouterContext;
  renderer(param1: React.ReactElement): { html: string };
  fn?<Props>(Page: React.ComponentType<Props>): (props: Props) => JSX.Element;
}

const modPageFn = function<Props>(Page: React.ComponentType<Props>) {
  return (props: Props) => <Page {...props} />;
};

export const createRenderer = ({
  res,
  req,
  routes,
  data,
  context,
  renderer,
  fn = modPageFn,
}: AfterCreateRendererOptions) => {
  return async function() {
    const asyncOrSyncRender = renderer(
      <StaticRouter location={req.url} context={context}>
        {renderRoutes(routes, { data })}
      </StaticRouter>
    );

    const renderedContent = await asyncOrSyncRender;

    const helmet = Helmet.renderStatic();

    // if user used <Redirect /> in render tree
    // we have to redirect it ...
    const { statusCode, url: redirectTo } = context;
    if (redirectTo) {
      res.redirect(statusCode || 302, redirectTo);
    }
    if (statusCode) {
      res.status(statusCode);
    }

    return { helmet, ...renderedContent };
  };
};
