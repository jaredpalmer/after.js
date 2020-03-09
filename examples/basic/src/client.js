import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { After } from '../../../build';
import './client.css';
import routes from './routes';

hydrate(
	<BrowserRouter>
		<After data={data} routes={routes} />
	</BrowserRouter>,
	document.getElementById('root')
)

if (module.hot) {
  module.hot.accept();
}
