import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { DocumentProps } from './types';

import { __AfterContext } from './Document';

export interface AfterRenderDocumentOptions extends DocumentProps {
  Doc: React.ComponentType<DocumentProps>;
}

export const renderDocument = ({
  Doc,
  ...props
}: AfterRenderDocumentOptions) => {
  return ReactDOMServer.renderToStaticMarkup(
    <__AfterContext.Provider value={props}>
      <Doc {...props} />
    </__AfterContext.Provider>
  );
};
