import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ensureReady, After } from '@jaredpalmer/after';
import Layout from './layout';
import './client.css';
import routes from './routes';

ensureReady(routes).then(data =>
  hydrate(
    <BrowserRouter>
      <Layout>
        <After data={data} routes={routes} />
      </Layout>
    </BrowserRouter>,
    document.getElementById('root')
  )
);

if (module.hot) {
  module.hot.accept();
}
