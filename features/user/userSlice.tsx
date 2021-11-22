/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface UserState {
	displayName?: string;
	uid?: string;
	email?: string;
	photoURL?: string;
}

export interface AuthError {
	message: string;
}

export interface AuthState {
	isAuth: boolean;
	user?: UserState;
	isLoading?: boolean;
	error?: AuthError;
}

export const initialState: AuthState = {
	isAuth: false,
	isLoading: false,
	error: { message: "An Error occurred" },
};

const userSlice = createSlice({
	name: "user",
	initialState,

	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		setLogOutState: (state) => {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the Immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes
			state.user = undefined;
			state.isAuth = false;
			state.isLoading = false;
		},

		// Use the PayloadAction type to declare the contents of `action.payload`
		setLogInState: (state, action: PayloadAction<UserState>) => {
			state.user = action.payload;
			state.isAuth = true;
		},
	},
});

export const { setLogInState, setLogOutState } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
