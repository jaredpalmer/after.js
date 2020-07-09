# Transition Behavior

By default, After.js will wait for `getInitialProps` to get resolved or rejected, so when the `getInitialProps` job is complete, it will show the next page. We call this behavior `blocked` (Fetch -> Render).

<!--- TODO: Add some gifs here to explain this approch better --->

You may want to show the next page with a skeleton or a spinner while `getInitialProps` is pending. We call this behavior `instant` (Render -> Fetch -> Re-Render).

<!--- TODO: Add some gifs here to explain this approch better --->

you can switch to `instant` behavior by passing a prop to `<After />`.

```jsx
// client.js

ensureReady(routes).then(data =>
  hydrate(
    <BrowserRouter>
      <After data={data} routes={routes} transitionBehavior="instant" />
    </BrowserRouter>,
    document.getElementById('root')
  )
);
```
