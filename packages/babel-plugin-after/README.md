# babel-plugin-after

Babel plugin to add additional chunk info to asyncComponent() in Afterjs.

## How It's Wokring

1. search for import statements from these paths `'@jaredpalmer/after'` and `'@jaredpalmer/after/asyncComponent'`
2. then it finds a local name for `asyncComponent` import statement

```javascript
// example1.js
import { asyncComponent } from '@jaredpalmer/after'; // localname is asyncComponent

// example2.js
import { asyncComponent as foo } from '@jaredpalmer/after'; // localname is foo

// example3.js
import asyncComponent from '@jaredpalmer/after/asyncComponent'; // localname is asyncComponent

// example4.js
import foo from '@jaredpalmer/after/asyncComponent'; // localname is foo

// example5.js
import { asyncComponent as foo, After } from '@jaredpalmer/after'; // localname is foo

// example6.js
import { After } from '@jaredpalmer/after'; // there is no `asyncComponent` import so babel plugin skips this file

// example7.js
import loader from '@jaredpalmer/after/asyncComponent'; // localname is loader
import { asyncComponent, After } from '@jaredpalmer/after'; // localname is asyncComponent

// localname = [`loader`, `asyncComponent`] :)
```

2. then it searches for FunctionCalls that have these conditions:

1) name of function that get called matches localname array
2) that function act as value of property
3) the name of property must be `component`

```javascript
import { asyncComponent } from '@jaredpalmer/after'; // localname is asyncComponent

// let's look for localname (`asyncComponent`) and see where it get called
// ...

// oh nice I found a call to that function
{
  component: asyncComponent({
    loader: () =>
      import(
        `./pages/ProducDetail`
      )
  }),
}

// now let me check and see if it's value of an object propery that named `component`
{ // <- it's an object
  // 👇 and property name is `component`
  component: asyncComponent({
    loader: () =>
      import(
        `./pages/ProducDetail`
      )
  })
}
```

## Examples

**In**

```js
{
  path: "/product/:name",
  component: asyncComponent({
    loader: () =>
      import(
        `./pages/ProducDetail`
      )
  })
}
```

**Out**

```js
{
  path: "/product/:name",
  component: asyncComponent({
    loader: () =>
      import(
        /* webpackChunkName: 'pages-ProducDetail' */
        `./pages/ProducDetail`
      )
    chunkName: "pages-ProducDetail",
  })
}

// 👆 as you can see `./pages/ProducDetail` changed to `pages-ProducDetail`,
// because for web servers `/` means a folder
// and webpackChunkName is name of file that saved on disk,
// so `/` in file name may break our app
```

**In**

```js
{
  path: "/product/:name",
  component: asyncComponent({
    loader: () =>
      import(
        /* webpackChunkName: 'HelloWorld' */
        `./pages/ProducDetail`
      )
  })
}
```

**Out**

```js
{
  path: "/product/:name",
  component: asyncComponent({
    loader: () =>
      import(
        /* webpackChunkName: 'HelloWorld' */
        `./pages/ProducDetail`
      ),
      chunkName: "HelloWorld",
  })
}
```

**In**

```js
const name = "SlimShady"
{
  path: "/rap/god",
  component: asyncComponent({
    loader: () =>
      import(
        `./pages/${name}`
      )
  })
}
```

**Out**

```js
const name = "SlimShady"
{
  path: "/rap/god",
  component: asyncComponent({
    loader: () =>
      import(
        /* webpackChunkName: '[request]' */
        `./pages/${name}`
      ),
    chunkName: name,
  })
}
```

**In**

```js
{
  path: "/test",
  component: asyncComponent({
    loader: () =>
      import(
        `./pages/test`
      ),
    chunkName: "my-custom-chunk-name",
  })
}
```

**Out**

```js
{
  path: "/test",
  component: asyncComponent({
    loader: () =>
      import(
        /* webpackChunkName: 'my-custom-chunk-name' */
        `./pages/test`
      ),
      chunkName: "my-custom-chunk-name",
  })
}
```

**In**

```js
{
  path: "/test",
  component: asyncComponent({
    loader: () =>
      import(
        /* webpackChunkName: 'my-custom-chunk-name' */
        `./pages/test`
      ),
    chunkName: "i-will-replace-magic-comment",
  })
}
```

**Out**

```js
{
  path: "/test",
  component: asyncComponent({
    loader: () =>
      import(
        /* webpackChunkName: 'i-will-replace-magic-comment' */
        `./pages/test`
      ),
    chunkName: "i-will-replace-magic-comment",
  })
}
```

## Installation

```sh
$ npm install babel-plugin-after --save-dev
```

or if you use Yarn like me:

```sh
$ yarn add -D babel-plugin-after
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["after"]
}
```

#### Options

- _`prefix`_: string (defaults: "") String used to append before `chunkName` and `webpackChunkName`.

```json
{
  "plugins": ["after", { "prefix": "MyPrefix-" }]
}
```

### Via CLI

```sh
$ babel --plugins after script.js
```

### Via Node API

```javascript
require('babel-core').transform('code', {
  plugins: ['after'],
});
```
