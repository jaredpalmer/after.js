import React from 'react';
import { After } from '@jaredpalmer/after';

function App({ route, data }) {
  return <After data={data} routes={route.routes} />;
}

export default App;
