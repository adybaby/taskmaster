import thunk from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducers';

const composeEnhancers =
  // eslint-disable-next-line no-underscore-dangle
  (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) ||
  compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
