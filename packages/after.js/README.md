![repo-banner](https://user-images.githubusercontent.com/4060187/34948491-454de294-f9db-11e7-8fc5-86985ba05be8.png)

# After.js

[![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@jaredpalmer/after)](https://bundlephobia.com/result?p=@jaredpalmer/after) [![npm](https://img.shields.io/npm/dm/@jaredpalmer/after)](https://www.npmjs.com/package/@jaredpalmer/after) [![Known Vulnerabilities](https://snyk.io/test/github/jaredpalmer/after.js/badge.svg?targetFile=package.json)](https://snyk.io/test/github/jaredpalmer/after.js?targetFile=package.json) ![Github Actions](https://github.com/jaredpalmer/after.js/workflows/Release/badge.svg) [![GitHub version](https://badge.fury.io/gh/jaredpalmer%2Fafter.js.svg)](https://badge.fury.io/gh/jaredpalmer%2Fafter.js) ![After-status](https://david-dm.org/jaredpalmer/after.js.svg?path=packages/after.js) [![license](https://badgen.now.sh/badge/license/MIT)](./LICENSE) [![Discord](https://img.shields.io/discord/769256827007139912?label=%F0%9F%92%AC%20%20join%20us%20on%20discord&style=plastic)](https://discord.com/invite/RevdZTYMzr)

If [Next.js](https://github.com/zeit/next.js) and [React Router](https://github.com/reacttraining/react-router) had a baby...

## Project Goals / Philosophy / Requirements

Next.js is awesome. However, its routing system isn't for me. IMHO React Router is a better foundation upon which such a framework should be built....and that's the goal here:

- Routes are just components and don't / should not have anything to do with folder structure. Static route configs are fine.
- Next.js's `getInitialProps` was/is a brilliant idea.
- Route-based code-splitting should come for free or be easy to opt into.
- Route-based transitions / analytics / data loading / preloading etc. , should either come for free or be trivial to implement on your own.

**Table of Contents**

<!-- prettier-ignore-start -->

<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [After.js](#afterjs)
  - [Project Goals / Philosophy / Requirements](#project-goals--philosophy--requirements)
  - [Getting Started with After.js](#getting-started-with-afterjs)
    - [Quickstart](#quickstart)
  - [Data Fetching](#data-fetching)
    - [`getInitialProps: (ctx) => Data`](#getinitialprops-ctx--data)
    - [Add Params to `getInitialProps: (ctx) => Data`](#add-params-to-getinitialprops-ctx--data)
    - [Injected Page Props](#injected-page-props)
  - [Routing](#routing)
    - [Parameterized Routing](#parameterized-routing)
    - [Client Only Data and Routing](#client-only-data-and-routing)
  - [Transition Behavior](#transition-behavior)
  - [Dynamic 404 and Redirects](#dynamic-404-and-redirects)
    - [404 Page](#404-page)
    - [Dynamic 404](#dynamic-404)
    - [Redirect](#redirect)
  - [Code Splitting](#code-splitting)
  - [Disable Auto-Scroll Globally](#disable-auto-scroll-globally)
  - [Disable Auto-Scroll for a Specific Page](#disable-auto-scroll-for-a-specific-page)
  - [Custom `<Document>`](#custom-document)
  - [Custom/Async Rendering](#customasync-rendering)
  - [Author](#author)
  - [Inspiration](#inspiration)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!-- prettier-ignore-end -->

## Getting Started with After.js

After.js enables Next.js-like data fetching with any React SSR app that uses React Router.

### Quickstart

You can quickly bootstrap an SSR React app with After.js using Razzle. While Razzle is not required, this documentation assumes you have the tooling setup for an isomorphic React application.

```bash
yarn global add create-after-app
create-after-app myapp
cd myapp
yarn start
```

Refer to [Razzle's](https://github.com/jaredpalmer/razzle) docs for tooling, babel, and webpack customization.

## Data Fetching

For page components, you can add a `static async getInitialProps` function.
This will be called on both initial server render, and then client mounts.
Results are made available on `this.props`.

```js
// ./src/About.js
import React from 'react';
import { NavLink } from 'react-router-dom';

class About extends React.Component {
  static async getInitialProps({ req, res, match }) {
    const stuff = await CallMyApi();
    return { stuff };
  }

  render() {
    return (
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <h1>About</h1>
        {this.props.stuff}
      </div>
    );
  }
}

export default About;
```

### `getInitialProps: (ctx) => Data`

Within `getInitialProps`, you have access to all you need to fetch data on both
the client and the server:

- `req?: Request`: (server-only) An Express.js request object.
- `res?: Response`: (server-only) An Express.js response object.
- `match`: React Router's `match` object.
- `history`: React Router's `history` object.
- `location`: (client-only) React Router's `location` object (you can only use location.pathname on server).
- `scrollToTop`: React Ref object that controls scroll behavior when URL changes.

### Add Params to `getInitialProps: (ctx) => Data`

You can extend `ctx`, and pass your custom params to it. this is useful when you want to fetch some data by condition or store fetched data in a global state managment system (like redux) or you may need to pass those params as props to your component from `server.js` (e.g result of user agent parsing).

```js
// ./src/server.js
...
try {
  const html = await render({
    req,
    res,
    routes,
    chunks,
    // Anything else you add here will be made available
    // within getInitialProps(ctx)
    // e.g a redux store...
    customThing: 'thing',
  });
  res.send(html);
} catch (error) {
  console.error(error);
  res.json({ message: error.message, stack: error.stack });
}
...
```

Don't forget to pass your custom params to `<After/>` in `client.js`:

```js
// ./src/client.js
...
ensureReady(routes).then(data =>
  hydrate(
    <BrowserRouter>
      {/*
        Anything else you pass to <After/> will be made available
        within getInitialProps(ctx)
        e.g a redux store...
      */}
      <After data={data} routes={routes} customThing="thing" />
    </BrowserRouter>,
    document.getElementById('root')
  )
);
...
```

### Injected Page Props

- Whatever you have returned in `getInitialProps`
- `prefetch: (pathname: string) => void` - Imperatively prefetch _and cache_ data for a path. Under the hood this will map through your route tree, call the matching route's `getInitialProps`, store it, and then provide it to your page component. If the user ultimately navigates to that path, the data and component will be ready ahead of time. In the future, there may be more options to control cache behavior in the form of a function or time in milliseconds to keep that data around.
- `refetch: (nextCtx?: any) => void` - Imperatively call `getInitialProps` again
- `isLoading` - It shows that if the returned promise from `getInitialProps` is in the pending state or not

## Routing

As you have probably figured out, React Router powers all of After.js's
routing. You can use any and all parts of RR.

### Parameterized Routing

```js
// ./src/routes.js
import Home from './Home';
import About from './About';
import Detail from './Detail';

// Internally these will become:
// <Route path={path} exact={exact} render={props => <component {...props} data={data} />} />
const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: '/detail/:id',
    component: Detail,
  },
];

export default routes;
```

```js
// ./src/Detail.js
import React from 'react';
import { Route } from 'react-router-dom';

class Detail extends React.Component {
  // Notice that this will be called for
  // /detail/:id
  // /detail/:id/more
  // /detail/:id/other
  static async getInitialProps({ req, res, match }) {
    const item = await CallMyApi(`/v1/item${match.params.id}`);
    return { item };
  }

  render() {
    return (
      <div>
        <h1>Detail</h1>
        {this.props.item}
        <Route
          path="/detail/:id/more"
          exact
          render={() => <div>{this.props.item.more}</div>}
        />
        <Route
          path="/detail/:id/other"
          exact
          render={() => <div>{this.props.item.other}</div>}
        />
      </div>
    );
  }
}

export default Detail;
```

### Client Only Data and Routing

In some parts of your application, you may not need server data fetching at all
(e.g. settings). With After.js, you just use React Router 4 as you normally
would in client land: You can fetch data (in componentDidMount) and do routing
the same exact way.

## Transition Behavior

By default, `after.js` will wait for `getInitialProps` to get resolved or rejected, so when the `getInitialProps` job is complete, it will show the next page. We call this behavior `blocked`.

You may want to show the next page with a skeleton or a spinner while `getInitialProps` is pending. We call this behavior `instant`.

you can switch to `instant` behavior by passing a prop to `<After />`.

```js
// ./src/client.js

// transitionBehavior = blocked | instant

ensureReady(routes).then(data =>
  hydrate(
    <BrowserRouter>
      <After data={data} routes={routes} transitionBehavior="instant" />
    </BrowserRouter>,
    document.getElementById('root')
  )
);
```

## Dynamic 404 and Redirects

### 404 Page

React Router can detect No Match (404) Routes and show a fallback component, you can define your custom fallback component in `routes.js` file.

```js
// ./src/routes.js

import React from 'react';
import Home from './Home';
import Notfound from './Notfound';
import { asyncComponent } from '@jaredpalmer/after';

export default [
  // normal route
  {
    path: '/',
    exact: true,
    component: Home,
  },
  // 404 route
  {
    // there is no need to declare path variable
    // react router will pick this component as fallback
    component: Notfound,
  },
];
```

Notfound component must set `staticContext.statusCode` to 404 so express can set response status code [more info](https://reacttraining.com/react-router/web/guides/server-rendering/404-401-or-any-other-status).

```js
// ./src/Notfound.js

import React from 'react';
import { Route } from 'react-router-dom';

function NotFound() {
  return (
    <Route
      render={({ staticContext }) => {
        if (staticContext) staticContext.statusCode = 404;
        return <div>The Page You Were Looking For Was Not Found</div>;
      }}
    />
  );
}

export default NotFound;
```

if you don't declare 404 component in `routes.js` After.js will use its default fallback.

### Dynamic 404

Sometimes you may need to send a 404 response based on some API response, in this case, react-router don't show fallback and you have to check for that in your component.

```js
import Notfound from './Notfound';

function ProductPage({ product, error }) {
  if (error) {
    if (error.response.status === 404) {
      return <Notfound />;
    }

    return <p>Something went Wrong !</p>;
  }
  {
    /* if there were no errors we have our data */
  }
  return <h1>{product.name}</h1>;
}

ProductPage.getInitialProps = async ({ match }) => {
  try {
    const { data } = await fetchProduct(match.params.slug);
    return { product: data };
  } catch (error) {
    return { error };
  }
};
```

this makes code unreadable and hard to maintain. after.js makes this easy by providing an API for handling Dynamic 404 pages. you can return `{ statusCode: 404 }` from `getInitialProps` and after.js will show 404 fallback components that you defined in `routes.js` for you.

```js
function ProductPage({ product }) {
  return <h1>{product.name}</h1>;
}

ProductPage.getInitialProps = async ({ match }) => {
  try {
    const { data } = await fetchProduct(match.params.slug);
    return { product: data };
  } catch (error) {
    if (error.response.status === 404) return { statusCode: 404 };
    return { error };
  }
};
```

### Redirect

You can redirect the user to another route by using `Redirect` from react-router, but it can make your code unreadable and hard to maintain.
with after.js you can redirect client to other route by returning `{ redirectTo: "/new-location" }` from `getInitialProps`.
this can become handy for authorization when user does not have permission to access a specific route and you can redirect him/her to the login page.

```js
Dashboard.getInitialProps = async ({ match }) => {
  try {
    const { data } = await fetchProfile();
    return { data };
  } catch (error) {
    if (error.response.status === 401) return { redirectTo: '/login' };
    return { error };
  }
};
```

The redirect will happen before after.js start renders react to string soo it's fast.
when using `redirectTo` default value for `statusCode` is 301, but you can use any numeric value you want.

## Code Splitting

After.js lets you easily define lazy-loaded or code-split routes in your `_routes.js` file. To do this, you'll need to modify the relevant route's `component` definition like so:

```js
// ./src/_routes.js
import React from 'react';
import Home from './Home';
import { asyncComponent } from '@jaredpalmer/after';

export default [
  // normal route
  {
    path: '/',
    exact: true,
    component: Home,
  },
  // codesplit route
  {
    path: '/about',
    exact: true,
    component: asyncComponent({
      loader: () => import('./About'), // required
      Placeholder: () => <div>...LOADING...</div>, // this is optional, just returns null by default
    }),
  },
];
```

## Disable Auto-Scroll Globally

By default, After.js will scroll to top when URL changes, you can change that by passing `scrollToTop: false` to render().

```js
// ./src/server.js

const scrollToTop = false;

const html = await render({
  req,
  res,
  routes,
  chunks,
  scrollToTop,
});
```

## Disable Auto-Scroll for a Specific Page

We are using a ref object to minimize unnecessary re-renders, you can mutate scrollToTop.current and component will not re-rendered but its scroll behavior will change immediately.
You can control auto-scroll behavior from `getInitialProps`.

```js
class MyComponent extends React.Component {
  static async getInitialProps({ scrollToTop }) {
    scrollToTop.current = false;
    return { scrollToTop, stuff: 'whatevs' };
  }

  render() {
    return <h1>Hello, World!</h1>;
  }

  componentWillUnmount() {
    this.props.scrollToTop.current = true; // at the end restore scroll behavior
  }
}
```

## Custom `<Document>`

After.js works similarly to Next.js with respect to overriding HTML document structure. This comes in handy if you are using a CSS-in-JS library or just want to collect data out of react context before or after render. To do this, create a file in `./src/Document.js` like so:

```js
// ./src/Document.js
import React from 'react';
import {
  AfterRoot,
  AfterData,
  AfterScripts,
  AfterStyles,
} from '@jaredpalmer/after';

class Document extends React.Component {
  static async getInitialProps({ renderPage }) {
    const page = await renderPage();
    return { ...page };
  }

  render() {
    const { helmet } = this.props;
    // get attributes from React Helmet
    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const bodyAttrs = helmet.bodyAttributes.toComponent();

    return (
      <html {...htmlAttrs}>
        <head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet="utf-8" />
          <title>Welcome to the Afterparty</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          <AfterStyles />
        </head>
        <body {...bodyAttrs}>
          <AfterRoot />
          <AfterData />
          <AfterScripts />
        </body>
      </html>
    );
  }
}

export default Document;
```

If you were using something like `styled-components`, and you need to wrap you entire app with some sort of additional provider or function, you can do this with `renderPage()`.

```js
// ./src/Document.js
import React from 'react';
import { ServerStyleSheet } from 'styled-components';
import { AfterRoot, AfterData, AfterScripts } from '@jaredpalmer/after';

export default class Document extends React.Component {
  static async getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = await renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    const { helmet, styleTags } = this.props;
    // get attributes from React Helmet
    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const bodyAttrs = helmet.bodyAttributes.toComponent();

    return (
      <html {...htmlAttrs}>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          {/* here is where we put our Styled Components styleTags... */}
          {styleTags}
        </head>
        <body {...bodyAttrs}>
          <AfterRoot />
          <AfterData />
          <AfterScripts />
        </body>
      </html>
    );
  }
}
```

To use your custom `<Document>`, pass it to the `Document` option of your After.js `render` function.

```js
// ./src/server.js
import express from 'express';
import { render } from '@jaredpalmer/after';
import routes from './routes';
import MyDocument from './Document';

const chunks = require(process.env.RAZZLE_CHUNKS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {
    try {
      // Pass document in here.
      const html = await render({
        req,
        res,
        document: MyDocument,
        chunks,
        routes,
      });
      res.send(html);
    } catch (error) {
      console.error(error);
      res.json({ message: error.message, stack: error.stack });
    }
  });

export default server;
```

## Custom/Async Rendering

You can provide a custom (potentially async) rendering function as an option to After.js `render` function.

If present, it will be used instead of the default ReactDOMServer renderToString function.

It has to return an object of shape `{ html : string!, ...otherProps }`, in which `html` will be used as the rendered string

Thus, setting `customRenderer = (node) => ({ html: ReactDOMServer.renderToString(node) })` is the the same as default option.

`otherProps` will be passed as props to the rendered Document

Example :

```js
// ./src/server.js
import React from 'react';
import express from 'express';
import { render } from '@jaredpalmer/after';
import { renderToString } from 'react-dom/server';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import routes from './routes';
import createApolloClient from './createApolloClient';
import Document from './Document';

const chunks = require(process.env.RAZZLE_CHUNKS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {
    const client = createApolloClient({ ssrMode: true });

    const customRenderer = node => {
      const App = <ApolloProvider client={client}>{node}</ApolloProvider>;
      return getDataFromTree(App).then(() => {
        const initialApolloState = client.extract();
        const html = renderToString(App);
        return { html, initialApolloState };
      });
    };

    try {
      const html = await render({
        req,
        res,
        routes,
        chunks,
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
```

## Author

- Jared Palmer [@jaredpalmer](https://twitter.com/jaredpalmer)

## Inspiration

- [Razzle](https://github.com/jaredpalmer/razzle)
- [Next.js](https://github.com/zeit/next.js)

---

> MIT License
