/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface ComposeState {
	compose: boolean;
	status?: "logIn" | "logOut";
}

const initialState: ComposeState = {
	compose: false,
	status: "logOut",
};

export const sendPostSlice = createSlice({
	name: "compose",
	initialState,

	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		setShowComposeState: (state) => {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the Immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes

			state.compose = true;
		},
		setHideComposeState: (state) => {
			state.compose = false;
		},
	},
});

export const { setShowComposeState, setHideComposeState } =
	sendPostSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectSendPost = (state: RootState) => state.sendPost.compose;

export default sendPostSlice.reducer;
