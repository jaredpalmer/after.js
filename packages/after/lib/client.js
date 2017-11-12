import React from 'react';
import ReactDOM from 'react-dom';
import App from '@jaredpalmer/after/dist/lib/App';
import path from 'path';
import { BrowserRouter } from 'react-router-dom';

import routes from './_routes';

ReactDOM.hydrate(
  <BrowserRouter>
    <App routes={routes} />
  </BrowserRouter>,
  document.getElementById('root')
);
