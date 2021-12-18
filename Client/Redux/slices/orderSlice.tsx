import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface OrderState {
	value: { order: Array<object>; address: object; total: string };
	order: Array<object>;
	address: object;
	total: string;
}

const initialState: any = {
	value: { order: [], address: {}, total: '' },
};

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		addNewOrder: (state, action: PayloadAction<OrderState>) => {
			state.value = action.payload;
		},
		clearOrder: (state: OrderState) => {
			state.value = initialState;
		},
	},
});

// Action creators are generated for each case reducer function
export const { addNewOrder, clearOrder } = orderSlice.actions;

export default orderSlice.reducer;
