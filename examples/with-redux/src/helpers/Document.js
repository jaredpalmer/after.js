import React from "react";
import manifest from "../../build/manifest.json";
import { getAssests } from "afterjs-assets";
import { AfterRoot, AfterData } from "@jaredpalmer/after";
import routes from "../routes";
import serialize from "serialize-javascript";

const prefix =
  process.env.NODE_ENV === "production"
    ? "/"
    : `http://${process.env.HOST}:${parseInt(process.env.PORT, 10) + 1}/`;

class Document extends React.Component {
  static async getInitialProps({ assets, data, renderPage, req }) {
    const page = await renderPage();

    const { styles, scripts } = getAssests({ req, routes, manifest });
    return { assets, data, styles, scripts, ...page };
  }

  render() {
    const { helmet, assets, data, styles, scripts, serverState } = this.props;
    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const bodyAttrs = helmet.bodyAttributes.toComponent();

    return (
      <html {...htmlAttrs}>
        <head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          {assets.client.css && (
            <link rel="stylesheet" href={assets.client.css} />
          )}
          {styles.map(path => (
            <link key={path} rel="stylesheet" href={path} />
          ))}
        </head>
        <body {...bodyAttrs}>
          <AfterRoot />
          <AfterData data={data} />
          <script dangerouslySetInnerHTML={{__html: `window.INITIAL_STATE = ${serialize(serverState)}` }}></script>
          <script
            type="text/javascript"
            src={assets.client.js}
            defer
            crossOrigin="anonymous"
          />
          {scripts.map(path => (
            <script
              key={path}
              defer
              type="text/javascript"
              src={prefix + path}
              crossOrigin="anonymous"
            />
          ))}
        </body>
      </html>
    );
  }
}

export default Document;
