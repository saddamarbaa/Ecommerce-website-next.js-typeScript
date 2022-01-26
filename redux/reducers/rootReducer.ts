import { combineReducers } from 'redux';
import userReducer from './usersReducer';

const rootReducer = combineReducers({
  user: userReducer,
});

export type ReducerType = ReturnType<typeof rootReducer>;
export default rootReducer;
