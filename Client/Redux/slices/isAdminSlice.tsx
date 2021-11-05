import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface isAdminState {
	value: boolean;
}

const initialState: isAdminState = {
	value: false,
};

export const isAdminSlice = createSlice({
	name: 'isAdmin',
	initialState,
	reducers: {
		isNewAdmin: (state, action: PayloadAction<boolean>) => {
			state.value = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { isNewAdmin } = isAdminSlice.actions;

export default isAdminSlice.reducer;
