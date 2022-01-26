import { createStore, applyMiddleware, compose, Store, AnyAction } from 'redux';
import ReduxThunkMiddleware from 'redux-thunk';
import ReduxLoggerMiddleware from 'redux-logger';
import { createWrapper, MakeStore } from 'next-redux-wrapper';

import rootReducer, { ReducerType } from '../reducers/rootReducer';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// Log only in development
let middlewares =
  process.env.NODE_ENV !== `development` ? [ReduxLoggerMiddleware, ReduxThunkMiddleware] : [ReduxThunkMiddleware];

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

const makeStore: MakeStore<Store<ReducerType, AnyAction>> = () => createStore(rootReducer, enhancer);

export const wrapper = createWrapper(makeStore);
