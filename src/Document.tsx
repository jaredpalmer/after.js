import * as React from 'react';
import serialize from 'serialize-javascript';
import { DocumentProps } from './types';

export class Document extends React.Component<DocumentProps> {
  static async getInitialProps({ assets, data, renderPage, scripts, styles, prefix }: DocumentProps) {
    const page = await renderPage();

    return { assets, data, scripts, styles, prefix, ...page };
  }

  render() {
    const { helmet, assets, data, scripts, styles, prefix } = this.props;
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
					{assets.client.css && <link rel="stylesheet" href={assets.client.css} />}
					{styles.map((path) => (
            <link key={path} rel="stylesheet" href={path} />
          ))}
        </head>
        <body {...bodyAttrs}>
          <AfterRoot />
          <AfterData data={data} />
					{scripts.map((path) => (
            <script
              key={path}
              defer
              type="text/javascript"
              src={prefix + path}
              crossOrigin="anonymous"
            />
          ))}
          <script type="text/javascript" src={assets.client.js} defer crossOrigin="anonymous" />
        </body>
      </html>
    );
  }
}

export function AfterRoot() {
  return <div id="root">DO_NOT_DELETE_THIS_YOU_WILL_BREAK_YOUR_APP</div>;
}

export function AfterData({ data }: any) {
  return (
    <script
			defer
      dangerouslySetInnerHTML={{
        __html: `window.__SERVER_APP_STATE__ = ${serialize({ ...data })}`
      }}
    />
  );
}
