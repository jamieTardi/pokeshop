import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface InitialState {
	value: object | null;
}

export interface CartState {
	id: string;
	items: Array<object>;
	user: string;
}

const initialState: InitialState = {
	value: null,
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		updateCart: (state, action: PayloadAction<CartState>) => {
			state.value === null
				? (state.value = {
						id: action.payload.id,
						items: [action.payload.items],
						user: action.payload.user,
				  })
				: (state.value = action.payload);
		},
	},
});

export const { updateCart } = cartSlice.actions;

export default cartSlice.reducer;
