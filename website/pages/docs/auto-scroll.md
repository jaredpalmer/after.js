# Automatically Scroll To Top

## Disable Auto-Scroll Globally

By default, After.js will scroll to top when URL changes, you can change that by passing `scrollToTop: false` to render().

```js
// server.js

const scrollToTop = false;

const html = await render({
  req,
  res,
  routes,
  assets,
  chunks,
  scrollToTop,
});
```

## Disable Auto-Scroll for a Specific Page

We are using a ref object to minimize unnecessary re-renders, you can mutate scrollToTop.current and component will not re-rendered but its scroll behavior will change immediately.
You can control auto-scroll behavior from `getInitialProps`.

```jsx
// About.js

function About({ scrollToTop }) {
  // at the end restore scroll behavior (optional)
  React.useEffect(() => {
    return () => {
      scrollToTop.current = true;
    };
  }, []);

  return <h1>About Us</h1>;
}

About.getInitialProps = async ({ req, res, match, scrollToTop }) => {
  scrollToTop.current = false;
  return { scrollToTop };
};
```
