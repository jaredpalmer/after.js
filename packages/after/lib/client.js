import React from 'react';
import ReactDOM from 'react-dom';
import App from '@jaredpalmer/after/dist/lib/App';
import path from 'path';
import { BrowserRouter } from 'react-router-dom';

import routes from './_routes';

const data = window.__AFTER__;

ReactDOM.hydrate(
  <BrowserRouter>
    <App routes={routes} data={data} />
  </BrowserRouter>,
  document.getElementById('root')
);
