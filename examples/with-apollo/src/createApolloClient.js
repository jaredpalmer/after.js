import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-fetch';

function createApolloClient({ ssrMode }) {
  return new ApolloClient({
    ssrMode,
    link: createHttpLink({
      uri: 'http://localhost:8080',
      credentials: 'same-origin',
      fetch,
    }),
    cache: ssrMode
      ? new InMemoryCache()
      : new InMemoryCache().restore(window.__APOLLO_STATE__),
  });
}

export default createApolloClient;
