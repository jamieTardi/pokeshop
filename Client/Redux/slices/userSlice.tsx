import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
	value: object | null;
}

const initialState: UserState = {
	value: null,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		updateUser: (state, action: PayloadAction<object>) => {
			console.log(action.payload);
			state.value = action.payload;
		},
		logoutUser: (state, action: PayloadAction<null>) => {
			localStorage.removeItem('poke-decks');
			state.value = null;
		},
	},
});

// Action creators are generated for each case reducer function
export const { updateUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
