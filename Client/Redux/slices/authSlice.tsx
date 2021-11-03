import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
	value: object;
}

const initialState: AuthState = {
	value: {},
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		SignIn: (state, action: PayloadAction<object>) => {
			localStorage.setItem('poke-decks', JSON.stringify({ ...action.payload }));
			state.value = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { SignIn } = authSlice.actions;

export default authSlice.reducer;
