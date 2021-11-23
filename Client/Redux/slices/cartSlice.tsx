import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface InitialState {
	value: CartState | null;
}

export interface CartState {
	id: string;
	items: Array<object>;
	user: string;
	_id: string;
}

const initialState: InitialState = {
	value: null,
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		updateCart: (state, action: PayloadAction<CartState>) => {
			state.value = action.payload;
		},
	},
});

export const { updateCart } = cartSlice.actions;

export default cartSlice.reducer;
