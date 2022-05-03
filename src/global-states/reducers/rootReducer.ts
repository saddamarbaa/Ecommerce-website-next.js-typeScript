import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import { productReducer, userReducer } from './admin';
import { authReducer } from './auth';

export const rootReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
  products: productReducer,
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const masterReducer = (state, action) => {
  if (action.type && action.type === HYDRATE) {
    // console.log('action.type', action.payload.products);
    const nextState = {
      ...state,
      products: {
        products: [...new Set([...action.payload.products.products, ...state.products.products])],
      },
    };
    return nextState;
  }

  return rootReducer(state, action);
};

// RootState[type]
export type ReducerType = ReturnType<typeof masterReducer>;

export default masterReducer;
