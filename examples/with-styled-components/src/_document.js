import React from 'react';
import { ServerStyleSheet } from 'styled-components';

export default class Document extends React.Component {
  static getInitialProps({ assets, data, renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { assets, data, ...page, styleTags };
  }

  render() {
    const { helmet, assets, data, styleTags } = this.props;
    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const bodyAttrs = helmet.bodyAttributes.toComponent();

    return (
      <html {...htmlAttrs}>
        <head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet="utf-8" />
          <title>Styled-Components Example</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          {styleTags}
        </head>
        <body {...bodyAttrs}>
          <div id="root" />
          {data && (
            <script
              type="text/javascript"
              dangerouslySetInnerHTML={{
                __html: ` window.__AFTER__ = ${JSON.stringify(data)}; `,
              }}
            />
          )}

          <script
            type="text/javascript"
            src={assets.client.js}
            defer
            crossOrigin="anonymous"
          />
        </body>
      </html>
    );
  }
}
