import { rootReducer } from 'global-states/reducers/rootReducer';
import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import loggerMiddleware from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import thunkMiddleware from 'redux-thunk';

// Binding middleware
const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    middleware.push(loggerMiddleware);
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const makeStore = ({ isServer }) => {
  if (isServer) {
    // If it's on server side, create a store
    return createStore(
      rootReducer,
      bindMiddleware([thunkMiddleware, loggerMiddleware])
    );
  }
  // If it's on client side, create a store which will persist
  const persistConfig = {
    key: 'nextjs',
    whitelist: ['auth'], // only auth will be persisted, add other reducers if needed
    storage, // if needed, use a safer storage
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer); // Create a new reducer with our existing reducer

  const store = createStore(
    persistedReducer,
    {},
    bindMiddleware([thunkMiddleware])
  ); // Creating the store again

  store.__persistor = persistStore(store); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature

  return store;
};

// Export the wrapper & wrap the pages/_app.js with this wrapper only
export const wrapper = createWrapper(makeStore, { debug: true });
