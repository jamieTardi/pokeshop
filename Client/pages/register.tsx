import { useState } from 'react';
import { TextField, FormControl, Button } from '@mui/material';
import { newUser, passwords } from '../Interfaces/Register';

const register = () => {
	const [newPasswords, setNewPasswords] = useState<passwords>({
		first: '',
		error: '',
		confirmed: '',
	});
	const [newUser, setNewUser] = useState<newUser>({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		phoneNo: '',
		createdOn: new Date().toUTCString(),
		role: 'member',
		lastLogin: new Date().toUTCString(),
		dob: '',
		address: {},
	});

	const handlePasswords = (password: string) => {
		if (newPasswords.first.length < 8) {
			setNewPasswords({
				...newPasswords,
				error: 'The length of this password is not at least 8 characters.',
			});
		} else if (newPasswords.first === password) {
			setNewUser({ ...newUser, password: newPasswords.first });
			setNewPasswords({ ...newPasswords, error: '', confirmed: password });
		} else {
			setNewPasswords({
				...newPasswords,
				error: 'These passwords do not match. Please try again.',
			});
		}
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
	};

	return (
		<div>
			<FormControl
				onSubmit={(e) => {
					handleSubmit(e);
				}}>
				<TextField
					error
					id='outlined-error'
					label='First Name'
					defaultValue=''
					onChange={(e) => {
						setNewUser({ ...newUser, firstName: e.target.value });
					}}
				/>
				<TextField
					error
					id='outlined-error'
					label='Last Name'
					defaultValue=''
					onChange={(e) => {
						setNewUser({ ...newUser, lastName: e.target.value });
					}}
				/>
				<TextField
					error
					id='outlined-error'
					label='Email'
					defaultValue=''
					onChange={(e) => {
						setNewUser({ ...newUser, email: e.target.value });
					}}
				/>
				<TextField
					error
					id='outlined-error'
					label='Password'
					defaultValue=''
					onChange={(e) => {
						setNewPasswords({ ...newPasswords, first: e.target.value });
					}}
				/>
				<TextField
					error
					id='outlined-error'
					label='Confirm Password'
					defaultValue=''
					onChange={(e) => {
						handlePasswords(e.target.value);
					}}
				/>
				{newPasswords.error !== '' && <p>{newPasswords.error}</p>}
				<Button type='submit'>Submit</Button>
			</FormControl>
		</div>
	);
};

export default register;
