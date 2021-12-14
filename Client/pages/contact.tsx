import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import * as EmailValidator from 'email-validator';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { sendContact } from '../api/index';

export default function SignUp() {
	const [message, setMessage] = useState<string>('');
	const [isValid, setIsValid] = useState<boolean>(false);
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		// eslint-disable-next-line no-console
		sendContact(
			{
				email: data.get('email'),
				firstName: data.get('firstName'),
				lastName: data.get('lastName'),
				message: data.get('message'),
			},
			setMessage,
		);
	};

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<Paper sx={{ padding: '5%', margin: '5% 0%' }}>
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<ContactMailIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Contact Us
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
									fullWidth
									id='firstName'
									label='First Name'
									autoFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id='lastName'
									label='Last Name'
									name='lastName'
									autoComplete='family-name'
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id='email'
									label='Email Address'
									name='email'
									autoComplete='email'
									onChange={(e) =>
										setIsValid(EmailValidator.validate(e.target.value))
									}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									rows={12}
									multiline
									name='message'
									label='Message'
									type='message'
									id='password'
								/>
							</Grid>
						</Grid>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							disabled={!isValid}
							sx={{ mt: 3, mb: 2 }}>
							Submit
						</Button>
						{!isValid && (
							<p>The email provided is not valid, please enter another one.</p>
						)}
						<p>{message}</p>
					</Box>
				</Box>
			</Paper>
		</Container>
	);
}
