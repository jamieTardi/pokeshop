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
		SignInAuth: (state, action: PayloadAction<any>) => {
			const userDetails: any = {
				token: action.payload.token,
			};
			localStorage.setItem('poke-decks', JSON.stringify({ userDetails }));
			state.value = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { SignInAuth } = authSlice.actions;

export default authSlice.reducer;
