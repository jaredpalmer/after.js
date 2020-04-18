# Dynamic Routing with After.js
This example shows the possibilities of dynamic routing & codesplitting by lazyloading the chunks for the components needed for the route.

## How to use

### Using `create-after-app`

Execute [`create-after-app`](https://github.com/jaredpalmer/after.js/tree/master/packages/create-after-app) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
npx create-after-app --example with-dynamic-routing with-dynamic-routing-app
```

### Download manually

Download the example [or clone the whole project](https://github.com/jaredpalmer/after.js.git):

```bash
curl https://codeload.github.com/jaredpalmer/after.js/tar.gz/master | tar -xz --strip=2 after.js-master/examples/with-dynamic-routing
cd with-dynamic-routing
```

Install it and run:

```bash
yarn install
yarn start
```

## Idea behind the example

This is a basic example of how to use after.js to orchestrate a dynamic routing. It's up to you how the routing-table is fetched, in this example it's a simple static list but you may fetch this from an API if you like.