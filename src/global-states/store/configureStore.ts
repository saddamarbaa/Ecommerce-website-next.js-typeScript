import { masterReducer as rootReducer, ReducerType } from 'global-states/reducers/rootReducer';
import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, createStore, Middleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import loggerMiddleware from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunkMiddleware from 'redux-thunk';

// Binding middleware
const bindMiddleware = (middleware: Middleware[]) => {
  if (process.env.NODE_ENV !== 'production') {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const makeStore = () => {
  const isServer = typeof window === 'undefined';
  if (isServer) {
    // If it's on server side, create a store
    return createStore(rootReducer, undefined, bindMiddleware([thunkMiddleware]));
  }
  // we need it only on client side
  // If it's on client side, create a store which will persist
  const persistConfig = {
    key: 'nextjs',
    // whitelist: ['list-test', 'auth', 'users', 'products'],
    whitelist: ['list-test', 'auth'], // only these reducers will be persisted, add other reducers if needed and please make sure it does not clash with server keys
    storage, // if needed, use a safer storage
  };

  // Create a new reducer with our existing reducer
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  // Creating the store again
  const store = createStore(
    persistedReducer,
    {},
    bindMiddleware([thunkMiddleware, loggerMiddleware])
  );

  // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  store.__persistor = persistStore(store); // Nasty hack

  return store;
};

// export an assembled wrapper
export const nextReduxWrapperTS = createWrapper<Store<ReducerType>>(makeStore, {
  debug: true,
});
