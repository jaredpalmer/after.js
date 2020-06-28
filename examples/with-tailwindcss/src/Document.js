import React from "react";
import {AfterData, AfterRoot, AfterScripts, AfterStyles} from "@jaredpalmer/after";

class Document extends React.Component {
    static async getInitialProps({renderPage}) {
        const page = await renderPage((App) => (props) => (
            <App {...props} />
        ));
        return {...page};
    }

    render() {
        const {helmet} = this.props;
        // get attributes from React Helmet
        const htmlAttrs = helmet.htmlAttributes.toComponent();
        const bodyAttrs = helmet.bodyAttributes.toComponent();

        return (
            <html {...htmlAttrs}>
            <head>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                <meta charSet="utf-8"/>
                <title>Welcome to the Afterparty</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                {helmet.title.toComponent()}
                {helmet.meta.toComponent()}
                {helmet.link.toComponent()}
                <AfterStyles/>
            </head>
            <body {...bodyAttrs}>
            <AfterRoot/>
            <AfterData/>
            <AfterScripts/>
            </body>
            </html>
        );
    }
}

export default Document;
