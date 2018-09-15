import React from 'react';
import { AfterRoot, AfterData } from '@jaredpalmer/after';
import { JssProvider, SheetsRegistry } from 'react-jss';
import { createGenerateClassName } from 'material-ui/styles';
import Layout from './layout';

class Document extends React.Component {
  static async getInitialProps({ req, assets, data, renderPage }) {
    const sheets = new SheetsRegistry();
    const generateClassName = createGenerateClassName();

    const page = await renderPage(After => props => (
      <JssProvider registry={sheets} generateClassName={generateClassName}>
        <Layout>
          <After {...props} />
        </Layout>
      </JssProvider>
    ));
    return { assets, data, sheets, ...page };
  }

  render() {
    const { helmet, assets, data, sheets } = this.props;
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
          {assets.client.css && (
            <link rel="stylesheet" href={assets.client.css} />
          )}
          <style type="text/css">{sheets.toString()}</style>
        </head>
        <body {...bodyAttrs}>
          <AfterRoot />
          <AfterData data={data} />
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

export default Document;
