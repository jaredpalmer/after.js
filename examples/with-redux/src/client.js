import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ensureReady, After } from '@jaredpalmer/after';
import routes from './routes';
import './client.css';
import { Provider } from 'react-redux';
import configureStore from './common/store/configureStore';

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;
const store = configureStore(preloadedState);

function renderApp() {
  ensureReady(routes).then(data =>
    hydrate(
      <BrowserRouter>
        <Provider store={store}>
          <After data={data} routes={routes} store={store} />
        </Provider>
      </BrowserRouter>,
      document.getElementById('root')
    )
  );
}

renderApp();

if (module.hot) {
  module.hot.accept('./routes', renderApp);
}
