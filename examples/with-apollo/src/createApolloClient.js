import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-fetch';

function createApolloClient({ ssrMode }) {
  return new ApolloClient({
    ssrMode,
    link: createHttpLink({
      uri: 'http://localhost:4000/graphql',
      credentials: 'same-origin',
      fetch,
    }),
    cache: new InMemoryCache(),
  });
}

export default createApolloClient;
