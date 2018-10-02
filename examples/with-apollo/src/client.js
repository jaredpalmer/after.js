import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ensureReady, After } from '@jaredpalmer/after';
import { ApolloProvider } from 'react-apollo';
import './client.css';
import routes from './routes';
import createApolloClient from './createApolloClient';

const client = createApolloClient({ ssrMode: false });

ensureReady(routes).then(data =>
  hydrate(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <After data={data} routes={routes} />
      </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('root')
  )
);
if (module.hot) {
  module.hot.accept();
}
