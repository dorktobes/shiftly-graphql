import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
/*  Apollo imports  */
import ApolloClient from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';

import App from './containers/App.jsx';
import reducers from './reducers';

const link = createHttpLink({
  uri: '/graphql',
  fetchOptions: {
    credentials: 'same-origin',
  }
});

const client = new ApolloClient({
  dataIdFromObject: o => o.id,
  link,
});

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
      <App />
    </Provider>
  </ApolloProvider>
  , document.getElementById('app'));
