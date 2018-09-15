# After.js and Material UI Example

## How to use
Download the example [or clone the whole project](https://github.com/jaredpalmer/after.js.git):

```bash
curl https://codeload.github.com/jaredpalmer/after.js/tar.gz/master | tar -xz --strip=2 after.js-master/examples/with-material-ui
cd with-material-ui
```

Install it and run:

```bash
yarn install
yarn start
```

## Idea behind the example

This is a basic example of how to use [Material UI](https://material-ui-next.com/getting-started/installation/) v1 with After.js.

The example page is wrapped in a [Layout](https://github.com/jaredpalmer/after.js/blob/master/examples/with-material-ui/src/layout.js) and uses the [MuiThemeProvider](https://material-ui-next.com/api/mui-theme-provider/) in a way to allow for server and client-side rendering with jss styling and classes.

You can see the [Home](https://github.com/jaredpalmer/after.js/blob/master/examples/with-material-ui/src/Home.js) page is a simpler example of how to build content into the application.