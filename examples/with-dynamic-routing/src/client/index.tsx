import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ensureReady, After, getSerializedData } from '@jaredpalmer/after';
import { mapDynamicRoutesWithComponents } from '../common/helpers/mapDynamicRoutesWithComponents';

const preloadedRouting = getSerializedData('preloaded_routing');
const routes = mapDynamicRoutesWithComponents(preloadedRouting);

function renderApp() {
  ensureReady(routes).then((data: any) => {
    // @ts-ignore 
    return hydrate(
      <BrowserRouter>
        {/*
        // @ts-ignore */}
        <After data={data} routes={routes} />
      </BrowserRouter>,
      document.getElementById('root')
    );
  });
}

renderApp();