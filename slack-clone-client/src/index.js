import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo';

import Routes from './routes';
import * as serviceWorker from './serviceWorker';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:8081/graphql',
});

const client = new ApolloClient({
  networkInterface,
});

const App = (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

ReactDOM.render(App, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();