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
