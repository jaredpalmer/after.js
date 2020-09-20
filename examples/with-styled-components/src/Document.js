import React from 'react';
import {
  AfterRoot,
  AfterData,
  AfterScripts,
  AfterStyles,
} from '@jaredpalmer/after';
import { ServerStyleSheet, ThemeProvider } from 'styled-components';
import theme from './theme';

class Document extends React.Component {
    static async getInitialProps({ renderPage }) {
        // Create the server side style sheet
        const sheet = new ServerStyleSheet();
        const page = await renderPage(App => props =>
            // When the app is rendered collect the styles that are used inside it
            sheet.collectStyles(
                <ThemeProvider theme={theme}>
                    <App {...props} />
                </ThemeProvider>
            )    
        );
        // Generate all the style tags so they can be rendered into the page
        const styleTags = sheet.getStyleElement();

        return { ...page, styleTags };
    }

    render() {
        const { helmet, styleTags } = this.props;
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
                    {styleTags}
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

export default Document;