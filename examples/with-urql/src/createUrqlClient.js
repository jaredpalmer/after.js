import {Client} from 'urql';

function createUrqlClient({ssrMode}) {
  if (ssrMode) {
    global.fetch = require('isomorphic-fetch');
  }

  const client = new Client({
    url: 'http://localhost:64895',
    initialCache: ssrMode ? {} : window.__URQL_STORE__,
  });

  console.log('Created urql client with store:', client.store);

  return client;
}

export default createUrqlClient;
