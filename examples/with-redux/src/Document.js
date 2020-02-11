import React from 'react';
import {
  AfterRoot,
  AfterData,
  AfterScripts,
  AfterStyles,
  __AfterContext,
} from '@jaredpalmer/after';
import { Provider } from 'react-redux';
import serialize from 'serialize-javascript';

class Document extends React.Component {
  static async getInitialProps({ renderPage, store }) {
    const page = await renderPage(App => props => (
      <Provider store={store}>
        <App {...props} />
      </Provider>
    ));
    return { ...page };
  }

  render() {
    const { helmet } = this.props;
    // get attributes from React Helmet
    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const bodyAttrs = helmet.bodyAttributes.toComponent();

    return (
      <html {...htmlAttrs}>
        <head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet="utf-8" />
          <title>Welcome to the Afterparty</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          <AfterStyles />
        </head>
        <body {...bodyAttrs}>
          <AfterRoot />
          <AfterData />
          <ReduxData />
          <AfterScripts />
        </body>
      </html>
    );
  }
}

function ReduxData() {
  return (
    <__AfterContext.Consumer>
      {({ store }) => (
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__PRELOADED_STATE__ = ${serialize(
              store.getState()
            )}`,
          }}
        />
      )}
    </__AfterContext.Consumer>
  );
}

export default Document;
