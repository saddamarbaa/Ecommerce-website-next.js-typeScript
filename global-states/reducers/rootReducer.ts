import { combineReducers } from 'redux';

import authReducer from './authReducer';
import listReducer from './countryReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  list: listReducer,
});

// RootState[type]
export type ReducerType = ReturnType<typeof rootReducer>;

export default rootReducer;
