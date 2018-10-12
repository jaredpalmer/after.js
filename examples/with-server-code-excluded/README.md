# Exclude server code from client bundle Example

## The Problem

You cannot use a module that can only run in nodejs (server) inside your component's `getInitialProps`. Say you have a function that uses `bcrypt` to hash a string in the server:

```js
// file util.js
const bcrypt = require("bcrypt");

export const hashString = async aString => {
  return bcrypt.hash(aString, 10);
};
```

and you want to inject a hashed string to the component on initial server rendering:

```js
// Home.js
 static async getInitialProps({ req, res, match, history, location, ...ctx }) {
    var data = { stuff: "whatevs" };
    if (req) {
      // we know this block of code will only be executed in the server 
      try {
        const hashed = require("./server/util").hashString("Hello world");
        data["hashed"] = hashed;
      } catch (error) {
        console.log(error);
      }
    }
    return data;
  }
```

The client compilation will fail because bcrypt can only be used in nodejs environment.

```
...
ERROR in ./node_modules/bcrypt/node_modules/node-pre-gyp/lib/info.js
Module not found: Error: Can't resolve 'aws-sdk' in '/after.js/examples/with-server-code-excluded/node_modules/bcrypt/node_modules/node-pre-gyp/lib'
...
```

## The solution

To solve this, you need to use webpack's [IgnorePlugin](https://webpack.js.org/plugins/ignore-plugin/):

1. Create a `razzle.config.js` if not exists.
2. Add the IgnorePlugin to the config:

    ```js
    module.exports = {
      modify: (config, { target, dev }, webpack) => {
        if (target === 'web') {
          config.plugins.push(new webpack.IgnorePlugin(/server\//));
        }

        return config;
      },
    };
    ```

  The regular expression inside IgnorePlugin should point to the directory of the server codes. So it's better to put all the server-only codes inside a single directory. 
