import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './slices/counterSlice';
import authSlice from './slices/authSlice';
import userSlice from './slices/userSlice';
import isAdminSlice from './slices/isAdminSlice';

export const store = configureStore({
	reducer: {
		counter: counterSlice,
		auth: authSlice,
		user: userSlice,
		isAdmin: isAdminSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
