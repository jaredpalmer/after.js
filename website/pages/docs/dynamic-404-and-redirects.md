# Dynamic 404 and Redirects

## 404 Page

When your application doesn't have a 404 page After.js will automatically use it's default 404 page. you can override the default 404 page by adding your 404 page in `routes.js` file.

```js
// routes.js

import React from 'react';
import Home from './Home';
import NotFound from './NotFound';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  // 404 route
  {
    // there is no need to declare the "path"
    // react router will pick this component as the 404 page
    component: Notfound,
  },
];

export default routes;
```

`<Notfound />` must set `staticContext.statusCode` to 404 so express can set the right status code for the response [more info](https://reacttraining.com/react-router/web/guides/server-rendering/404-401-or-any-other-status).

```js
// NotFound.js

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

## Dynamic 404

You may need to show the 404 page based on some API response, in this case, React Router will not show it's fallback and you have to check for that in your component.

```jsx
import NotFound from './NotFound';

function Product({ item, error }) {
  if (error) {
    if (error.response.status === 404) {
      return <Notfound />;
    }

    return <p>Something went Wrong !</p>;
  }
  {
    /* if there were no errors we have our data */
  }
  return <h1>{item.name}</h1>;
}

Product.getInitialProps = async ({ match }) => {
  try {
    const item = await CallMyApi(`/v1/item/${match.params.id}`);
    return { item };
  } catch (error) {
    return { error };
  }
};
```

this makes code unreadable and hard to maintain. After.js makes this easy by providing an API for handling Dynamic 404 pages. you can return `{ statusCode: 404 }` from `getInitialProps` and After.js will show 404 fallback component that you defined in `routes.js`.

```jsx
function Product({ item }) {
  return <h1>{item.name}</h1>;
}

Product.getInitialProps = async ({ req, res, match }) => {
  try {
    const item = await CallMyApi(`/v1/item/${match.params.id}`);
    return { item };
  } catch (error) {
    if (error.response.status === 404) return { statusCode: 404 };
    return { error };
  }
};
```

## Redirect

You can redirect the user to another route by using `Redirect` from React Router, but it can make your code unreadable and hard to maintain.
with After.js you can redirect client to other route by returning `{ redirectTo: "/new-location" }` from `getInitialProps`.
this can become handy for authorization when user does not have permission to access a specific route and you can redirect him/her to the login page.

```js
Dashboard.getInitialProps = async ({ req, res, match }) => {
  try {
    const { data } = await fetchProfile();
    return { data };
  } catch (error) {
    if (error.response.status === 401) return { redirectTo: '/login' };
    return { error };
  }
};
```

The redirect will happen before After.js starts to render the react on the server so it's faster than rendering `<Redirect />` in your component.

when return `redirectTo` from `getInitialProps`, status code for the response is **302**.
you can override the status code like this (only **3XX** status codes are allowed when you redirect the request to a new URL):

```js
MyComponent.getInitialProps = async ({ req, res, match }) => {
  return { redirectTo: '/login', statusCode: 301 };
};
```
