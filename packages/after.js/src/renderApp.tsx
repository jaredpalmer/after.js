import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { Helmet } from 'react-helmet';
import { matchPath, StaticRouter, RouteProps } from 'react-router-dom';
import { Document as DefaultDoc, __AfterContext } from './Document';
import { After } from './After';
import { loadInitialProps } from './loadInitialProps';
import * as utils from './utils';
import * as url from 'url';
import {
  AfterRenderAppOptions,
  AfterClientData,
  CtxBase,
  AsyncRouteProps,
  RedirectWithStatusCode,
  ServerAppState,
  RenderResult,
  DocumentProps,
  RenderPageResult,
} from './types';
import { StaticRouterContext } from 'react-router';
import { getAssets } from './getAssets';

const modPageFn = function<Props>(Page: React.ComponentType<Props>) {
  return function RenderAfter(props: Props) {
    return <Page {...props} />;
  };
};

/**
 * The customRenderer parameter is a (potentially async) function that can be set to return
 * more than just a rendered string.
 * If present, it will be used instead of the default ReactDOMServer renderToString function.
 * It has to return an object of shape { html, ... }, in which html will be used as the rendered string
 * Other props will be also pass to the Document component
 */
export async function renderApp<T>(
  options: AfterRenderAppOptions<T>
): Promise<RenderResult> {
  const {
    req,
    res,
    routes: pureRoutes,
    assets,
    document: Document,
    customRenderer,
    chunks,
    scrollToTop = true,
    ssg = false,
    ...rest
  } = options;
  const autoScrollRef: React.Ref<boolean> = { current: scrollToTop };

  // check and see if 404 page is in list of app routes
  // if there wan no 404 page in routes array add After.js default 404 page
  const routes: AsyncRouteProps[] = utils.getAllRoutes(pureRoutes);

  const ctx: CtxBase = {
    req,
    res,
    scrollToTop: autoScrollRef,
    ...rest,
  };
  const pathname: string = url.parse(req.url).pathname as string;

  // finds related component for the current path (request url)
  //  and calls component.getInitialProps({ match,...ctx })
  const { match, data: initialData } = await loadInitialProps(
    pathname,
    routes,
    ctx
  );

  // <StaticRouter /> context object, which get mutated by React Router
  // and it contains information about statusCode and target <Redirect /> component target url (if any)
  // https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/StaticRouter.md#context-object
  const context: StaticRouterContext = {};

  // here we will check result of the getInitialProps
  // and see if it contains redirectTo or statusCode properties
  // we will mutate context if we got redirectTo or statusCode in initialData
  if (initialData) {
    const { redirectTo, statusCode } = initialData as RedirectWithStatusCode;

    if (statusCode) {
      context.statusCode = statusCode;
    }

    // if we got redirectTo from getInitalProps
    // we don't waste server resources by rendering the react tree
    // so we return early
    if (redirectTo) {
      return {
        html: '',
        data: initialData,
        redirect: redirectTo,
        statusCode: statusCode || 302,
      };
    }
  }

  // this object containes data that <After /> will use on client-side
  const afterData: AfterClientData = {
    scrollToTop: autoScrollRef,
  };

  // well, we will save a few bits in this way
  if (ssg) {
    afterData.ssg = true;
  }

  // result of getInitialProps + <After /> props
  const data: ServerAppState = {
    initialData,
    afterData,
  };

  const renderPage = async (fn = modPageFn) => {
    // By default, we keep ReactDOMServer synchronous renderToString function
    const defaultRenderer = (element: React.ReactElement<T>) => ({
      html: ReactDOMServer.renderToString(element),
    });
    const renderer = customRenderer || defaultRenderer;
    const asyncOrSyncRender = renderer(
      <StaticRouter location={req.url} context={context}>
        {fn(After)({ routes, data, transitionBehavior: 'blocking' })}
      </StaticRouter>
    );

    const renderedContent = await asyncOrSyncRender;
    const helmet = Helmet.renderStatic();

    return { helmet, ...renderedContent };
  };

  const Doc = Document || DefaultDoc;

  // get css and javascript file paths for the async componetns
  const { scripts, styles } = getAssets({ route: match, chunks });

  const reactRouterMatch = matchPath(req.url, match as RouteProps);

  // Docuement.getInitialProps() will call renderPage()
  // and renderPage() will call ReactDOMServer.renderToString
  // so we get our React Tree html from this function
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
    scrollToTop: autoScrollRef,
    ...rest,
  });

  // if we got a <Redirect /> in during render of the react tree
  // we redirect the user and we don't waste server resources
  if (context.url) {
    return {
      html: '',
      data: initialData,
      redirect: context.url,
      statusCode: context.statusCode || 302,
    };
  }

  const props: DocumentProps<RenderPageResult> = {
    assets,
    data,
    scripts,
    styles,
    match: reactRouterMatch,
    ...rest,
    ...docProps,
    html,
  };

  // we render <Docuemnt /> which is our app shell
  const doc = ReactDOMServer.renderToStaticMarkup(
    <__AfterContext.Provider value={props}>
      <Doc {...props} />
    </__AfterContext.Provider>
  );

  const page = `<!doctype html>${doc}`;

  return {
    html: page,
    data: initialData,
    redirect: '',
    statusCode: context.statusCode || 200,
  };
}
