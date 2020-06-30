import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { Auth0Provider } from '@auth0/auth0-react';
import { App } from './App';
import { store } from './state/Store';
import config from './config.json';

ReactDOM.render(
  <Auth0Provider
    domain={config.auth0.domain}
    clientId={config.auth0.clientId}
    redirectUri={window.location.origin}
  >
    <Provider store={store}>
      <Router>
        <QueryParamProvider ReactRouterRoute={Route}>
          <App />
        </QueryParamProvider>
      </Router>
    </Provider>
    ,
  </Auth0Provider>,
  document.getElementById('root')
);
