# After.js TypeScript Example

## How to use

Download the example [or clone the whole project](https://github.com/jaredpalmer/after.js.git):

```bash
curl https://codeload.github.com/jaredpalmer/after.js/tar.gz/master | tar -xz --strip=2 after.js-master/examples/with-typescript
cd with-typescript
```

Install it and run:

```bash
yarn install
yarn start
```

## Idea behind the example

This is an of how to use After.js with [TypeScript](https://github.com/Microsoft/TypeScript).
In `after.config.js`, we locate the part of the webpack configuration
that is running `babel-loader` and swap it out for `ts-loader`.
Additionally, we make sure After.js knows how to resolve `.ts` and `.tsx` files.

Lastly, we also need to modify our Jest configuration to handle typescript files.
Thus we add `ts-jest` and `@types/jest` to our dev dependencies. Then we augment After.js's default jest setup by adding a field in our `package.json`.

```json
// package.json

{
  ...
  "jest": {
    "transform": {
      ".(ts|tsx)": "<rootDir>/node_modules/ts-jest/preprocessor.js",
      "^.+\\.css$": "<rootDir>/node_modules/after.js/config/jest/cssTransform.js",
      "^(?!.*\\.(js|jsx|css|json)$)": "<rootDir>/node_modules/after.js/config/jest/fileTransform.js",
      "^.+\\.(js|jsx)$": "<rootDir>/node_modules/after.js/config/jest/babelTransform.js"
    },
    "testMatch": [
      "<rootDir>/src/**/__tests__/**/*.(ts|js)?(x)",
      "<rootDir>/src/**/?(*.)(spec|test).(ts|js)?(x)"
    ],
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "json"
    ],
    "collectCoverageFrom": [
      "src/**/*.{js,jsx,ts,tsx}"
    ]
  }
}
```

The `tslint.json` and `tsconfig.json` are taken from Microsoft's official
[TypeScript-React-Starter](https://github.com/Microsoft/TypeScript-React-Starter).
