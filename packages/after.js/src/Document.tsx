import * as React from 'react';
import serialize from 'serialize-javascript';
import { isJS } from './utils';
import { DocumentProps, AfterContext, DocumentgetInitialProps } from './types';

export const __AfterContext = React.createContext({} as AfterContext);

export class Document extends React.Component<DocumentProps> {
  static getInitialProps = async ({ renderPage }: DocumentgetInitialProps) => {
    const page = await renderPage();
    return { ...page };
  };

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

export const useAfterContext = () => {
  return React.useContext(__AfterContext);
};

export const AfterRoot: React.FC = () => {
  const { html } = useAfterContext();
  return <div id="root" dangerouslySetInnerHTML={{ __html: html }} />;
};

export const AfterData: React.FC<{ data?: object }> = ({ data }) => {
  const { data: contextData } = useAfterContext();
  return (
    <script
      defer
      dangerouslySetInnerHTML={{
        __html: `window.__SERVER_APP_STATE__ =  ${serialize({
          ...(data || contextData),
        })}`,
      }}
    />
  );
};

export const AfterStyles: React.FC = () => {
  const { assets, styles } = useAfterContext();
  return (
    <>
      {assets.client.css && <link rel="stylesheet" href={assets.client.css} />}
      {styles.map(path => (
        <link key={path} rel="stylesheet" href={path} />
      ))}
    </>
  );
};

export const AfterScripts: React.FC = () => {
  const { scripts, assets } = useAfterContext();
  return (
    <>
      {scripts.filter(isJS).map(path => (
        <script
          key={path}
          defer
          type="text/javascript"
          src={path}
          crossOrigin="anonymous"
        />
      ))}
      {assets.client.js && (
        <script
          type="text/javascript"
          src={assets.client.js}
          defer
          crossOrigin="anonymous"
        />
      )}
    </>
  );
};
