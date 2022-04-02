import { combineReducers } from 'redux'
import userReducer from './adminUsersReducer'
import authReducer from './authReducer'
import productReducer from './adminProductReducer'

export const rootReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
  products: productReducer,
})

// RootState[type]
export type ReducerType = ReturnType<typeof rootReducer>;

export default rootReducer
