import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '../Redux/store';

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
			<ThemeProvider theme={theme}>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<Component {...pageProps} />
				</div>
			</ThemeProvider>
		</Provider>
	);
}

export default MyApp;
