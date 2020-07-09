# Custom Document

After.js works similarly to Next.js with respect to overriding HTML document structure. This comes in handy if you are using a CSS-in-JS library or just want to collect data out of react context before or after render. To do this, create a file in `Document.js` like so:

```jsx
// Document.js

import React from 'react';
import {
  AfterRoot,
  AfterData,
  AfterScripts,
  AfterStyles,
} from '@jaredpalmer/after';

function Document({ helmet }) {
  // get attributes from React Helmet
  const htmlAttrs = helmet.htmlAttributes.toComponent();
  const bodyAttrs = helmet.bodyAttributes.toComponent();

  return (
    <html {...htmlAttrs}>
      <head>
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        <AfterStyles />
      </head>
      <body {...bodyAttrs}>
        <AfterRoot />
        <AfterData />
        <AfterScripts />
      </body>
    </html>
  );
}

Document.getInitialProps = async ({ renderPage }) => {
  const page = await renderPage();
  return { ...page };
};

export default Document;
```

To use your custom `<Document />`, pass it to the `document` option of your After.js `render` function.

```jsx
// server.js
...
import Document from './Document';

const html = await render({
  req,
  res,
  routes,
  assets,
  chunks,
  document: Document,
});
...
```

### renderPage()

If you were using something like `styled-components`, and you need to wrap you entire app with some sort of additional provider or function, you can do this with `renderPage()`.

```jsx
// Document.js

import React from 'react';
import { ServerStyleSheet } from 'styled-components';
import { AfterRoot, AfterData, AfterScripts } from '@jaredpalmer/after';

function Document({ helmet, styleTags }) {
  const htmlAttrs = helmet.htmlAttributes.toComponent();
  const bodyAttrs = helmet.bodyAttributes.toComponent();

  return (
    <html {...htmlAttrs}>
      <head>
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        {/* here is where we put our Styled Components styleTags... */}
        {styleTags}
      </head>
      <body {...bodyAttrs}>
        <AfterRoot />
        <AfterData />
        <AfterScripts />
      </body>
    </html>
  );
}

export default Document;
```
