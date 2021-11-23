import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './slices/counterSlice';
import authSlice from './slices/authSlice';
import userSlice from './slices/userSlice';
import isAdminSlice from './slices/isAdminSlice';
import isMobileSlice from './slices/mobileSlice';
import pagesSlice from './slices/pagesSlice';
import cartSlice from './slices/cartSlice';

export const store = configureStore({
	reducer: {
		counter: counterSlice,
		auth: authSlice,
		user: userSlice,
		isAdmin: isAdminSlice,
		isMobile: isMobileSlice,
		currentPage: pagesSlice,
		cart: cartSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
