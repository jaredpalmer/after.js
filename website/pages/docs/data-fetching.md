# Data Fetching

For page components, you can add a `static async getInitialProps` function.
This will be called on both initial server render, and then client mounts.
Results are made available on `props`.

```jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

function About({ stuff }) {
  return (
    <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <h1>About</h1>
      {stuff}
    </div>
  );
}

About.getInitialProps = async ({ req, res, match }) => {
  const stuff = await CallMyApi();
  return { stuff };
};

export default About;
```

Also works with class components:

```jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

class About extends React.Component {
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

About.getInitialProps = async ({ req, res, match }) => {
  const stuff = await CallMyApi();
  return { stuff };
};

export default About;
```

### getInitialProps: (ctx) => Data

Within `getInitialProps`, you have access to all you need to fetch data on both
the client and the server:

- `req`: (server-only) An Express.js request object.
- `res`: (server-only) An Express.js response object.
- `history`: (client-only) React Router's `history` object.
- `location`: (client-only) React Router's `location` object.
- `match`: React Router's `match` object.
- `scrollToTop`: React Ref object that controls scroll behavior when URL changes.

### Injected Page Props

- Whatever you have returned in `getInitialProps`
- `prefetch: (pathname: string) => void` - Imperatively prefetch _and cache_ data for a path. Under the hood this will map through your route tree, call the matching route's `getInitialProps`, store it, and then provide it to your page component. If the user ultimately navigates to that path, the data and component will be ready ahead of time. In the future, there may be more options to control cache behavior in the form of a function or time in milliseconds to keep that data around.
- `refetch: (nextCtx?: any) => void` - Imperatively call `getInitialProps` again
- `isLoading` - It shows that if the returned promise from `getInitialProps` is in the pending state or not

### Add Params to getInitialProps

You can extend `ctx`, and pass your custom params to it. this is useful when you want to fetch some data by condition or store fetched data in a global state managment system (like redux or mobx) or you may need to pass those params as props to your component from `server.js` (e.g result of useragent parsing).

```js
// server.js
...

try {
  const html = await render({
    req,
    res,
    routes,
    assets,
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

Don't forget to pass your custom params to `<After />` in `client.js`:

```jsx
// client.js
...

ensureReady(routes).then(data =>
  hydrate(
    <BrowserRouter>
      {/*
        Anything else you pass to <After /> will be made available
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
