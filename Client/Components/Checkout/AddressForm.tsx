import * as React from 'react';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { RootState } from '../../Redux/store';
import { formComplete } from '../../Redux/slices/formComplete';
import * as EmailValidator from 'email-validator';
import { checkUsers, updateAddress } from '../../api';

interface address {
	address: {
		firstName: string;
		lastName: string;
		addressLineOne: string;
		email: string;
		city: string;
		county: string;
		postCode: string;
		country: string;
	};

	setAddress: Function;
}
interface user {
	result: {
		_id: string;
	};
}

interface returnedDetails {
	returnedDetails: {};
	address: {
		firstName: string;
		lastName: string;
		addressLineOne: string;
		email: string;
		city: string;
		county: string;
		postCode: string;
		country: string;
	};
}

export default function AddressForm({ address, setAddress }: address) {
	//local state
	const [isComplete, setIsComplete] = useState<boolean>(false);
	const [isEmail, setIsEmail] = useState<boolean>(false);
	const [userDetails, setUserDetails] = useState<{ isUser: boolean } | null>(
		null,
	);
	const [returnedDetails, setReturnedDetails] =
		useState<null | returnedDetails>(null);

	//Global state
	const dispatch = useAppDispatch();
	const globalForm = useAppSelector((state: RootState) => state.form.value);
	const user = useAppSelector((state: RootState) => state.auth.value);

	//General Logic

	const updateFields = () => {
		setAddress({
			firstName: returnedDetails?.address.firstName,
			lastName: returnedDetails?.address.lastName,
			addressLineOne: returnedDetails?.address.addressLineOne,
			email: returnedDetails?.address.email,
			city: returnedDetails?.address.city,
			county: returnedDetails?.address.county,
			postCode: returnedDetails?.address.postCode,
			country: returnedDetails?.address.country,
		});
	};

	//UseEffects

	//Looping over the object and checking that fields are filled in and not a empty string

	useEffect(() => {
		if (user !== new Object()) {
			setUserDetails({ isUser: true });
		}
	}, []);

	useEffect(() => {
		if (isComplete && user.token !== '') {
			checkUsers(user.token, address, setReturnedDetails);
		}
	}, [isComplete]);

	useEffect(() => {
		if (userDetails) {
			if (userDetails.isUser) {
				checkUsers(user.token, address, setReturnedDetails);
			}
		}
	}, [userDetails]);

	console.log(returnedDetails);

	useEffect(() => {
		setIsComplete(Object.values(address).every((item) => item !== ''));
	}, [address]);

	useEffect(() => {
		if (isComplete) {
			dispatch({ type: formComplete, payload: true });
			if (returnedDetails && returnedDetails.address === new Object()) {
				checkUsers(user.token, address, setReturnedDetails);
			}
		} else if (!isComplete && globalForm && !isEmail) {
			dispatch({ type: formComplete, payload: false });
		}
	}, [isComplete]);

	useEffect(() => {
		setIsEmail(EmailValidator.validate(address.email));
	}, [address.email]);

	return (
		<React.Fragment>
			<Typography variant='h6' gutterBottom>
				Shipping address
			</Typography>
			<form>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							id='firstName'
							name='firstName'
							label='First name'
							fullWidth
							autoComplete='given-name'
							variant='standard'
							onChange={(e) => {
								setAddress({ ...address, firstName: e.target.value });
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							id='lastName'
							name='lastName'
							label='Last name'
							fullWidth
							autoComplete='family-name'
							variant='standard'
							onChange={(e) => {
								setAddress({ ...address, lastName: e.target.value });
							}}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							id='address1'
							name='address1'
							label='Address line 1'
							fullWidth
							autoComplete='shipping address-line1'
							variant='standard'
							onChange={(e) => {
								setAddress({ ...address, addressLineOne: e.target.value });
							}}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id='address2'
							name='address2'
							label='email'
							required
							fullWidth
							autoComplete='shipping address-line2'
							variant='standard'
							onChange={(e) => {
								setAddress({ ...address, email: e.target.value });
							}}
						/>
						{isEmail ? <p>Email is valid!</p> : <p>Invalid Email</p>}
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							id='city'
							name='city'
							label='City'
							fullWidth
							autoComplete='shipping address-level2'
							variant='standard'
							onChange={(e) => {
								setAddress({ ...address, city: e.target.value });
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							id='state'
							name='county'
							label='County'
							fullWidth
							variant='standard'
							onChange={(e) => {
								setAddress({ ...address, county: e.target.value });
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							id='zip'
							name='zip'
							label='Postal code'
							fullWidth
							autoComplete='shipping postal-code'
							variant='standard'
							onChange={(e) => {
								setAddress({ ...address, postCode: e.target.value });
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							id='country'
							name='country'
							label='Country'
							fullWidth
							autoComplete='shipping country'
							variant='standard'
							onChange={(e) => {
								setAddress({ ...address, country: e.target.value });
							}}
						/>
					</Grid>
				</Grid>
			</form>
		</React.Fragment>
	);
}
