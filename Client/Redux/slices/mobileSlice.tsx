import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface isMobileState {
	value: boolean;
}

const initialState: isMobileState = {
	value: false,
};

export const isMobileSlice = createSlice({
	name: 'isMobile',
	initialState,
	reducers: {
		isMobileChange: (state, action: PayloadAction<boolean>) => {
			state.value = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { isMobileChange } = isMobileSlice.actions;

export default isMobileSlice.reducer;
