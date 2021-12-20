import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography, CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Pokeball from '../Images/pokeball.png';
import Image from 'next/image';
import * as EmailValidator from 'email-validator';
import { signInUser } from '../api/index';
import { useDispatch } from 'react-redux';
import { SignInAuth } from '../Redux/slices/authSlice';

function Copyright(props: any) {
	return (
		<Typography
			variant='body2'
			color='text.secondary'
			align='center'
			{...props}>
			{'Copyright © '}
			<Link color='inherit' href='https://mui.com/'>
				Poké-decks
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

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

export default function SignIn() {
	const [isValid, setIsValid] = useState<boolean>(false);
	const [response, setResponse] = useState<any>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [message, setMessage] = useState<string>('');
	const dispatch = useDispatch();
	const history = useRouter();

	const [signInDetails, setSignInDetails] = useState<object>({
		email: '',
		password: '',
		isStayLogged: false,
	});
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsLoading(true);
		const data = new FormData(event.currentTarget);
		signInUser(
			{
				...signInDetails,
				email: data.get('email'),
				password: data.get('password'),
			},
			setResponse,
			setIsLoading,
			setMessage,
		);
	};

	useEffect(() => {
		if (response) {
			dispatch({ type: SignInAuth, payload: response.data });
			history.push('/');
		}
	}, [response]);

	const handleValidation = (event: React.ChangeEvent<HTMLInputElement>) => {
		let newEmail: string = event.currentTarget.value;
		setIsValid(EmailValidator.validate(newEmail));
	};

	return (
		<ThemeProvider theme={theme}>
			<Grid container component='main' sx={{ height: '100vh' }}>
				<CssBaseline />
				<Grid
					item
					xs={false}
					sm={4}
					md={7}
					sx={{
						backgroundImage: `url(https://pokedecks.s3.us-west-2.amazonaws.com/109332.jpg)`,
						backgroundRepeat: 'no-repeat',
						backgroundColor: (t) =>
							t.palette.mode === 'light'
								? t.palette.grey[50]
								: t.palette.grey[900],
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}></Grid>
				<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
					<Box
						sx={{
							my: 8,
							mx: 4,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}>
						<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
							<Image src={Pokeball} alt='pokeball' />
						</Avatar>
						<Typography component='h1' variant='h5'>
							Sign in
						</Typography>
						<Box
							component='form'
							noValidate
							onSubmit={handleSubmit}
							sx={{ mt: 1 }}>
							<TextField
								margin='normal'
								required
								fullWidth
								id='email'
								label='Email Address'
								name='email'
								autoComplete='email'
								autoFocus
								onChange={handleValidation}
							/>
							<TextField
								margin='normal'
								required
								fullWidth
								name='password'
								label='Password'
								type='password'
								id='password'
								autoComplete='current-password'
							/>
							<FormControlLabel
								control={
									<Checkbox
										value
										color='primary'
										name='remember'
										onChange={(e) => {
											setSignInDetails({
												...signInDetails,
												isStayLogged: e.target.checked,
											});
										}}
									/>
								}
								label='Remember me'
							/>
							<Button
								type='submit'
								color='primary'
								fullWidth
								variant='contained'
								disabled={!isValid || isLoading}
								startIcon={isLoading && <CircularProgress size={20} />}
								sx={{ mt: 3, mb: 2 }}>
								Sign In
							</Button>
							{message !== '' && message}
							<Grid container>
								<Grid item xs>
									<Link href='#' variant='body2'>
										Forgot password?
									</Link>
								</Grid>
								<Grid item>
									<Link href='/Register' variant='body2'>
										{"Don't have an account? Sign Up"}
									</Link>
								</Grid>
							</Grid>
							<Grid container justifyContent='flex-end'>
								<Grid item>
									<Link href='/' variant='body2'>
										Go back to home page
									</Link>
								</Grid>
							</Grid>
							<Copyright sx={{ mt: 5 }} />
						</Box>
					</Box>
				</Grid>
			</Grid>
		</ThemeProvider>
	);
}
