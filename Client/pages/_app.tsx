import '../styles/globals.css';
import { useState } from 'react';
import type { AppProps } from 'next/app';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '../Redux/store';
import Layout from '../Components/General/Layout';
import { CookiesProvider } from 'react-cookie';

function MyApp({ Component, pageProps }: AppProps) {
	const theme = createTheme({
		palette: {
			primary: {
				main: '#673ab7',
			},
			secondary: {
				main: '#8561c5',
			},
		},
	});

	return (
		<Provider store={store}>
			<CookiesProvider>
				<ThemeProvider theme={theme}>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</ThemeProvider>
			</CookiesProvider>
		</Provider>
	);
}

export default MyApp;
