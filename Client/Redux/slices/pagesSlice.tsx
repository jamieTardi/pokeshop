import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
	value: string;
}

const initialState: UserState = {
	value: '',
};

export const pagesSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		currentPage: (state, action: PayloadAction<string>) => {
			state.value = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { currentPage } = pagesSlice.actions;

export default pagesSlice.reducer;
