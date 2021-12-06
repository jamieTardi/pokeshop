import { ControlPointSharp } from '@mui/icons-material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
	value: {
		token: string;
	};
}

const initialState: AuthState = {
	value: {
		token: '',
	},
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

			state.value = userDetails;
		},
		UpdateCart: (state, action: PayloadAction<any>) => {
			state.value = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { SignInAuth, UpdateCart } = authSlice.actions;

export default authSlice.reducer;
