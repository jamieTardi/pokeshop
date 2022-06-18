import React, { useEffect, useState } from 'react';
import { newUser, passwords, email } from '../Interfaces/Register';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Pokeball from '../Images/pokeball.png';
import Image from 'next/image';
import * as EmailValidator from 'email-validator';
import Nav from '../Components/General/Nav';
import { signUp } from '../api/index';
import { useRouter } from 'next/router';
import { CircularProgress, Paper } from '@mui/material';

function Copyright(props: any) {
	return (
		<Typography
			variant='body2'
			color='text.secondary'
			align='center'
			{...props}>
			{'Copyright © '}
			<Link color='inherit' href='https://mui.com/'>
				Poke-decks
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

export default function Register() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [emailCheck, setEmailCheck] = useState<email>({
		isCorrect: false,
		errorMsg: 'This Email is not valid. Please try again.',
		newEmail: '',
	});
	const [isError, setIsError] = useState<boolean>(false);
	const [isPhoneNo, setIsPhoneNo] = useState<boolean>(false);

	const [newPasswords, setNewPasswords] = useState<passwords>({
		first: '',
		second: '',
		error: '',
		confirmed: '',
		isMatched: false,
	});

	const [newUser, setNewUser] = useState<newUser>({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: '',
		phoneNo: '',
		createdOn: new Date().toUTCString(),
		role: 'member',
		lastLogin: new Date().toUTCString(),
		dob: '',
		address: {},
		isPromtions: false,
		refreshToken: '',
	});

	const handleEmailCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
		let newEmail: string = event.currentTarget.value;
		let isEmail = EmailValidator.validate(newEmail);
		if (isEmail) {
			setEmailCheck({ ...emailCheck, isCorrect: true, newEmail });
			setNewUser({ ...newUser, email: newEmail.toLowerCase() });
		} else {
			setEmailCheck({
				...emailCheck,
				isCorrect: false,
				newEmail: event.currentTarget.value,
			});
		}
	};

	const handlePasswords = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (newPasswords.first.length < 8) {
			setNewPasswords({
				...newPasswords,
				error: 'The length of this password is not at least 8 characters.',
				isMatched: false,
			});
		} else if (newPasswords.first === event.currentTarget.value) {
			setNewUser({
				...newUser,
				password: newPasswords.first,
				confirmPassword: event.currentTarget.value,
			});
			setNewPasswords({
				...newPasswords,
				error: '',
				confirmed: event.currentTarget.value,
				isMatched: true,
			});
		} else {
			setNewPasswords({
				...newPasswords,
				error: 'These passwords do not match. Please try again.',
				isMatched: false,
			});
		}
	};

	const togglePromotions = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNewUser({ ...newUser, isPromtions: event.target.checked });
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		setIsLoading(true);
		event.preventDefault();
		signUp(newUser, setIsLoading);
		if (!isLoading) {
			router.push('/registration');
		}
	};

	return (
		<div>
			<ThemeProvider theme={theme}>
				<Container component='main' maxWidth='md'>
					<CssBaseline />
					<Paper sx={{ padding: '0% 5%' }}>
						<Box
							sx={{
								marginTop: 8,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}>
							<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
								<Image src={Pokeball} />
							</Avatar>
							<Typography component='h1' variant='h5'>
								Sign up
							</Typography>
							<Box
								component='form'
								noValidate
								onSubmit={handleSubmit}
								sx={{ mt: 3 }}>
								<Grid container spacing={2}>
									<Grid item xs={12} sm={6}>
										<TextField
											autoComplete='given-name'
											name='firstName'
											required
											inputProps={{
												maxLength: 30,
											}}
											fullWidth
											id='firstName'
											label='First Name'
											autoFocus
											onChange={(e) => {
												if (/[^a-zA-Z]/.test(e.target.value)) {
													setIsError(true);
													setNewUser({ ...newUser, firstName: e.target.value });
												} else {
													setIsError(false);
													setNewUser({ ...newUser, firstName: e.target.value });
												}
											}}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<TextField
											required
											fullWidth
											inputProps={{
												maxLength: 30,
											}}
											id='lastName'
											label='Last Name'
											name='lastName'
											autoComplete='family-name'
											onChange={(e) => {
												if (/[^a-zA-Z]/.test(e.target.value)) {
													setIsError(true);
													setNewUser({ ...newUser, lastName: e.target.value });
												} else {
													setIsError(false);
													setNewUser({ ...newUser, lastName: e.target.value });
												}
											}}
										/>
									</Grid>
									{isError && (
										<Grid item xs={12}>
											<p style={{ color: 'red' }}>
												You may only enter letters for your names.
											</p>
										</Grid>
									)}
									<Grid item xs={12}>
										<TextField
											required
											fullWidth
											inputProps={{
												maxLength: 40,
											}}
											id='email'
											label='Email Address'
											name='email'
											autoComplete='email'
											onChange={handleEmailCheck}
										/>
										{emailCheck.isCorrect === false &&
											emailCheck.newEmail.length > 0 && (
												<p>{emailCheck.errorMsg}</p>
											)}
									</Grid>
									<Grid item xs={12}>
										<TextField
											required
											fullWidth
											inputProps={{
												maxLength: 12,
											}}
											id='telephone'
											type='tel'
											label='Telephone no'
											name='telephone'
											autoComplete='telephone'
											onChange={(e) => {
												if (/[^0-9]/.test(e.target.value)) {
													setIsPhoneNo(true);
													setNewUser({ ...newUser, phoneNo: e.target.value });
												} else {
													setIsPhoneNo(false);
													setNewUser({ ...newUser, phoneNo: e.target.value });
												}
											}}
										/>
									</Grid>
									{isPhoneNo && (
										<Grid item xs={12}>
											<p style={{ color: 'red' }}>
												Only numbers are acceptable in this input.
											</p>
										</Grid>
									)}

									<Grid item xs={12}>
										<TextField
											required
											fullWidth
											inputProps={{
												maxLength: 40,
											}}
											name='password'
											label='Password'
											type='password'
											id='password'
											autoComplete='new-password'
											onChange={(e) => {
												setNewPasswords({
													...newPasswords,
													first: e.currentTarget.value,
												});
											}}
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											required
											fullWidth
											inputProps={{
												maxLength: 40,
											}}
											name='confirm password'
											label='Confirm Password'
											type='password'
											id='password'
											autoComplete='new-password'
											onChange={handlePasswords}
										/>
										{newPasswords.error !== '' && (
											<p style={{ color: 'red' }}>{newPasswords.error}</p>
										)}
									</Grid>
									<Grid item xs={12}>
										<FormControlLabel
											control={
												<Checkbox
													value='allowExtraEmails'
													color='primary'
													onChange={(event) => {
														togglePromotions(event);
													}}
												/>
											}
											label='I want to receive inspiration, marketing promotions and updates via email.'
										/>
									</Grid>
								</Grid>
								<Button
									type='submit'
									fullWidth
									disabled={
										!newPasswords.isMatched || isLoading || isError || isPhoneNo
									}
									startIcon={isLoading && <CircularProgress size={20} />}
									variant='contained'
									sx={{ mt: 3, mb: 2 }}>
									Sign Up
								</Button>
								<Grid container justifyContent='flex-end'>
									<Grid item>
										<Link href='/signIn' variant='body2'>
											Already have an account? Sign in
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
							</Box>
						</Box>
					</Paper>
					<Copyright sx={{ mt: 5 }} />
				</Container>
			</ThemeProvider>
		</div>
	);
}
