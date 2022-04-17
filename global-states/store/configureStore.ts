import { rootReducer } from 'global-states/reducers/rootReducer';
import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, createStore, Middleware } from 'redux';
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

const makeStore = ({ isServer }: { isServer: boolean }) => {
  if (isServer) {
    // If it's on server side, create a store
    return createStore(rootReducer, bindMiddleware([thunkMiddleware]));
  }
  // If it's on client side, create a store which will persist
  const persistConfig = {
    key: 'nextjs',
    whitelist: ['auth'], // only these reducers will be persisted, add other reducers if needed
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
  store.__persistor = persistStore(store);

  return store;
};

// Export the wrapper & wrap the pages/_app.js with this wrapper only
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const nextReduxWrapperTS = createWrapper<Record<string, never>>(
  makeStore,
  { debug: true }
);
