import React from 'react';
import {hydrate} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {ensureReady, After} from '@jaredpalmer/after';
import {Provider} from 'urql';
import './client.css';
import routes from './routes';
import createUrqlClient from './createUrqlClient';

const urql = createUrqlClient({ssrMode: false});

ensureReady(routes).then(data =>
  hydrate(
    <Provider client={urql}>
      <BrowserRouter>
        <After data={data} routes={routes} />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
  ),
);

if (module.hot) {
  module.hot.accept();
}
