import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ensureReady, After } from '@jaredpalmer/after';
import './client.css';
import routes from './routes';
import { ThemeProvider } from 'styled-components';
import theme from './theme';

ensureReady(routes).then(data =>
  hydrate(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <After data={data} routes={routes} />
      </ThemeProvider>
    </BrowserRouter>,
    document.getElementById('root')
  )
);

if (module.hot) {
  module.hot.accept();
}
