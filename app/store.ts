/** @format */

import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import sendPostReducer from "../features/sendPost/sendPostSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		sendPost: sendPostReducer,
		user: userReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
