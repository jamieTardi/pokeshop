import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FormCompleteState {
	value: boolean;
}

const initialState: FormCompleteState = {
	value: false,
};

export const FormCompleteSlice = createSlice({
	name: 'Form Complete',
	initialState,
	reducers: {
		formComplete: (state, action: PayloadAction<boolean>) => {
			state.value = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { formComplete } = FormCompleteSlice.actions;

export default FormCompleteSlice.reducer;
