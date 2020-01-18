import * as React from 'react';
import serialize from 'serialize-javascript';
import { DocumentProps } from './types';

export const __AfterContext = React.createContext(
  {} as DocumentProps & { html: string }
);

export class Document extends React.Component<DocumentProps> {
  static async getInitialProps({ renderPage }: DocumentProps) {
    const page = await renderPage();
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
          <AfterScripts />
        </body>
      </html>
    );
  }
}

export const AfterRoot = () => {
  return (
    <__AfterContext.Consumer>
      {({ html }) => (
        <div id="root" dangerouslySetInnerHTML={{ __html: html }} />
      )}
    </__AfterContext.Consumer>
  );
};

export const AfterData: React.FC<{ data?: any }> = ({ data }) => {
  return (
    <__AfterContext.Consumer>
      {({ data: contextData }) => (
        <script
          id="server-app-state"
          type="application/json"
          dangerouslySetInnerHTML={{
            __html: serialize({ ...(data || contextData) }),
          }}
        />
      )}
    </__AfterContext.Consumer>
  );
};

export const AfterStyles = () => {
  return (
    <__AfterContext.Consumer>
      {({ assets }) =>
        assets.client.css && <link rel="stylesheet" href={assets.client.css} />
      }
    </__AfterContext.Consumer>
  );
};

export const AfterScripts = () => {
  return (
    <__AfterContext.Consumer>
      {({ assets }) =>
        assets.client.js && (
          <script
            type="text/javascript"
            src={assets.client.js}
            defer
            crossOrigin="anonymous"
          />
        )
      }
    </__AfterContext.Consumer>
  );
};
