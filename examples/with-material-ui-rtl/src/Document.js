import React from 'react';
import {
  AfterRoot,
  AfterData,
  AfterScripts,
  AfterStyles,
} from '@jaredpalmer/after';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles';
import { jss } from './RTL';
import theme from './theme';

export default class Document extends React.Component {
  static async getInitialProps({ renderPage }) {
    const sheets = new ServerStyleSheets({ jss });
    const page = await renderPage(App => props =>
      sheets.collect(
        <ThemeProvider theme={theme}>
          <App {...props} />
        </ThemeProvider>
      )
    );
    const css = sheets.getStyleElement();
    return { css, ...page };
  }

  render() {
    const { helmet, css } = this.props;
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
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          <AfterStyles />
          {css}
        </head>
        <body dir="rtl" {...bodyAttrs}>
          <AfterRoot />
          <AfterData />
          <AfterScripts />
        </body>
      </html>
    );
  }
}
