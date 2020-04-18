import React from 'react';
import {
  AfterRoot,
  AfterData,
  AfterScripts,
  AfterStyles,
  SerializeData,
  __AfterContext,
  DocumentProps
} from '@jaredpalmer/after';

class Document extends React.Component<DocumentProps> {
    public static async getInitialProps({ renderPage }: any) {
        const page = await renderPage((App: any) => (props: any) => <App {...props} />);

        return { ...page };
    }

    public render() {
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

                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet" />

                <AfterStyles />
            </head>
            <body {...bodyAttrs}>
                <AfterRoot />
                <AfterData />
                <Routing />
                <AfterScripts />
            </body>
        </html>
        );
    }
}

function Routing() {
    const { routing }: any = React.useContext(__AfterContext);
    return <SerializeData name="preloaded_routing" data={routing} />;
}

export default Document;