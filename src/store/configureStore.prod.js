//Remember to keep the production/development version of this file in sync.
//This boilerplate file is likely to be the same for each project that uses Redux.
//With Redux, the actual stores are in /reducers.

import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk';

export default function configureStore(initialState, storemiddlewareHistory) {
  // Add middleware
  const finalCreateStore = compose(
    // Middleware you want to use in production:
    applyMiddleware(
        storemiddlewareHistory,
        thunkMiddleware
    )
    // Other store enhancers if you use any
  )(createStore);

  const store = finalCreateStore(rootReducer, initialState);

  storemiddlewareHistory.listenForReplays(store);

  return store;
}
