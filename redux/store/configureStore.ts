import { createStore, applyMiddleware, compose, Store, AnyAction } from 'redux';
import ReduxThunkMiddleware from 'redux-thunk';
import ReduxPromiseMiddleware from 'redux-promise-middleware';
import ReduxLoggerMiddleware from 'redux-logger';

import { createWrapper, MakeStore } from 'next-redux-wrapper';
import rootReducer, { ReducerType } from '../reducers/rootReducer';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// Log only in development
// let middlewares =
// process.env.NODE_ENV === `development`
//   ? [ReduxLoggerMiddleware, ReduxThunkMiddleware, ReduxPromiseMiddleware]
//   : [ReduxThunkMiddleware, ReduxPromiseMiddleware];

let middlewares = [ReduxThunkMiddleware];

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

const makeStore = ({ isServer }) => {
  if (isServer) {
    return createStore(rootReducer, enhancer);
  } else {
    //If it's on client side, create a store which will persist
    const { persistStore, persistReducer, autoRehydrate } = require('redux-persist');
    const storage = require('redux-persist/lib/storage').default;
    const persistConfig = {
      key: 'nextjs',
      whitelist: ['auth', 'users', 'user'], // only counter will be persisted, add other reducers if needed
      storage // if needed, use a safer storage
    };

    const persistedReducer = persistReducer(persistConfig, rootReducer); // Create a new reducer with our existing reducer

    const store = createStore(persistedReducer, {}, ...middlewares); // Creating the store again

    store.__persistor = persistStore(store); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature

    return store;
  }
};

export const wrapper = createWrapper(makeStore);
