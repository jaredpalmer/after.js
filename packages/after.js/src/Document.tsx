import React from 'react';
import { DocumentProps, AfterContext, DocumentgetInitialProps } from './types';
import { SerializeData } from './serializeData';

export const __AfterContext = React.createContext({} as AfterContext);

export class Document extends React.Component<DocumentProps> {
  static async getInitialProps({ renderPage }: DocumentgetInitialProps) {
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

/**
 * renders <div id="root">SSR HTML RESULT</div>
 */
export const AfterRoot: React.FC = () => {
  const { html } = useAfter();
  return <div id="root" dangerouslySetInnerHTML={{ __html: html }} />;
};

/**
 * sends getInitialProps data to the client
 * and when react starts rehydation
 * we don't get any errors
 */
export const AfterData: React.FC = () => {
  const { data } = useAfter();
  return <SerializeData name="server_app_state" data={data} />;
};

/**
 * renders <link rel="stylesheet"> tags
 */
export const AfterStyles: React.FC = () => {
  const { chunks, styles } = useAfter();
  return (
    <>
      {chunks.client.css.map(path => (
        <link key={path} rel="stylesheet" href={path} />
      ))}
      {styles.map(path => (
        <link key={path} rel="stylesheet" href={path} />
      ))}
    </>
  );
};

/**
 * renders <script> tags on the so client can
 * download files and do rehydration
 */
export const AfterScripts: React.FC = () => {
  const { scripts, chunks } = useAfter();
  return (
    <>
      {scripts.map(path => (
        <script
          key={path}
          defer
          type="text/javascript"
          src={path}
          crossOrigin="anonymous"
        />
      ))}
      {chunks.client.js.map(path => (
        <script
          key={path}
          type="text/javascript"
          src={path}
          defer
          crossOrigin="anonymous"
        />
      ))}
    </>
  );
};

/**
 * reads data from AfterContext
 */
const useAfter = () => {
  return React.useContext(__AfterContext);
};
