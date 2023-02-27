import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyles from './styles';
import Pages from './pages';

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
    // uri: "http://localhost:4000",
    uri: "https://odyssey-lift-off-server-production-ad04.up.railway.app/",
    cache: new InMemoryCache(),
});
// Портал https://railway.app сгенерил интернет-домен для этого клиентского
// приложения - https://odyssey-lift-off-client-production-2d71.up.railway.app/

ReactDOM.render(
  <ApolloProvider client={client}>
    <GlobalStyles />
    <Pages />
  </ApolloProvider>,
  document.getElementById('root')
);
