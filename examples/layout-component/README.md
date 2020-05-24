# Layout Component in After.js

## How to use

### Using `create-after-app`

Execute [`create-after-app`](https://github.com/jaredpalmer/after.js/tree/master/packages/create-after-app) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
npx create-after-app --example layout-component layout-component-app
```

### Download manually

Download the example [or clone the whole project](https://github.com/jaredpalmer/after.js.git):

```bash
curl https://codeload.github.com/jaredpalmer/after.js/tar.gz/master | tar -xz --strip=2 after.js-master/examples/layout-component
cd layout-component
```

Install it and run:

```bash
yarn install
yarn start
```

## Idea behind the example

This is a basic example of how to wrap your pages in layout component (header and footer usually)

we have to add `<Layout />` at two places
1) Document.js
2) client.js

first create a [custom `Document.js`](https://github.com/jaredpalmer/after.js#custom-document) and then pass your Layout component to `renderPage` fuction:

```js
// document.js

Document.getInitialProps = async ({ renderPage }) {
  const page = await renderPage(After => props => (
    <Layout>
      <After {...props} />
    </Layout>
  ));
  return { ...page };
}
```
and for client side:
```js
// client.js

ensureReady(routes).then(data =>
  hydrate(
    <BrowserRouter>
      <Layout>
        <After data={data} routes={routes} />
      </Layout>
    </BrowserRouter>,
    document.getElementById('root')
  )
);
```
