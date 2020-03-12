import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { ensureReady } from '@jaredpalmer/after';
import './client.css';
import routes from './routes';

ensureReady(routes).then(data => {
  hydrate(
    <BrowserRouter>{renderRoutes(routes, { data })}</BrowserRouter>,
    document.getElementById('root')
  );
});

if (module.hot) {
  module.hot.accept();
}
