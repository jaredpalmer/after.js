# Redux x After.js

## How to use

### Using `create-after-app`

Execute [`create-after-app`](https://github.com/jaredpalmer/after.js/tree/master/packages/create-after-app) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
npx create-after-app --example with-redux with-redux-app
```

### Download manually

Download the example [or clone the whole project](https://github.com/jaredpalmer/after.js.git):

```bash
curl https://codeload.github.com/jaredpalmer/after.js/tar.gz/master | tar -xz --strip=2 after.js-master/examples/with-redux
cd with-redux
```

Install it and run:

```bash
yarn install
yarn start
```

## Idea behind the example

This is a basic example of how to use Redux with After.

You can use store (dispatch and getState) in `getInitialProps`, HMR Ready.

Almost 100% of the code is taken from the [official Redux universal example](https://github.com/reactjs/redux/tree/master/examples/universal).

redux docs for [SSR](https://redux.js.org/recipes/server-rendering)

### Adding HMR

if your redux store state gets removed on every change you make to your code, you have to update webpack HMR logic like below:

```js
// client.js

function renderApp() {
  ensureReady(routes).then(data =>
    hydrate(
      <BrowserRouter>
        <Provider store={store}>
          <After data={data} routes={routes} store={store} />
        </Provider>
      </BrowserRouter>,
      document.getElementById('root')
    )
  );
}

renderApp();

if (module.hot) {
  module.hot.accept('./routes', renderApp);
}
```
