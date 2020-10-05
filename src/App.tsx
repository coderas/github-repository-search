import React from 'react';
import 'antd/dist/antd.css';
import { Repositories } from './containers';

import {
  ApolloClient,
  createHttpLink,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const GITHUB_BASE_URL = 'https://api.github.com/graphql';

const token = process.env.REACT_APP_GITHUB_ACCESS_TOKEN;

const httpLink = createHttpLink({
  uri: GITHUB_BASE_URL
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const App = () => (
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Repositories />
    </ApolloProvider>
  </React.StrictMode>
);

export default App;
