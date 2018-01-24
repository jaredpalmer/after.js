import React from 'react';
import ReactDOM from 'react-dom';
import App from './_app';
import ensureReady from './ensureReady';
import { BrowserRouter } from 'react-router-dom';

import routes from './_routes';

const data = JSON.parse(
  document
    .getElementById('server-app-state')
    .textContent.replace(/%3C\/script%3E/g, '</script>')
);

ensureReady(routes).then(() => {
  ReactDOM.hydrate(
    <BrowserRouter>
      <App routes={routes} data={data} />
    </BrowserRouter>,
    document.getElementById('root')
  );
});

if (module.hot) {
  module.hot.accept();
}
