import React, { useState, useEffect } from 'react';
import InLineEdit from '../General/InLineEdit';
import { user } from '../../Interfaces/user';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { RootState } from '../../Redux/store';
import { getUser, updateUser } from '../../api';
import styles from '../../styles/Account.module.scss';
import {
	Button,
	Grid,
	TextField,
	Checkbox,
	FormControlLabel,
} from '@mui/material';
import Loading from '../UIComponents/Loading';

interface currentUser {
	currentUser: object;
	setCurrentUser: Function;
	firstName: string;
	_id: string;
	lastName: string;
	email: string;
	phoneNo: string;
	isPromtions: boolean;
	address: {
		addressLineOne: string;
		city: string;
		county: string;
		country: string;
		postCode: string;
	};
}

const MyDetails = () => {
	//local state
	const [value, setValue] = useState<string>('');
	const [currentUser, setCurrentUser] = useState<currentUser | null>(null);
	const [isError, setIsError] = useState<boolean>(false);
	const [type, setType] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [infoTxt, setInfoTxt] = useState<string>('');

	//Redux state
	const user = useAppSelector((state: RootState) => state.auth.value);

	//General logic
	const handleUpdate = (e: any) => {
		e.preventDefault();
		setIsLoading(true);
		if (currentUser) {
			updateUser(currentUser._id, currentUser, setIsLoading);
		}
		setInfoTxt('Information updated sucessfully');
		setTimeout(() => {
			setInfoTxt('');
		}, 2500);
	};

	console.log(currentUser);

	//UseEffects

	useEffect(() => {
		getUser(user.token, setCurrentUser);
		setIsLoading(false);
	}, []);

	useEffect(() => {
		if (currentUser) {
			if (currentUser === undefined) {
				setIsError(true);
			} else {
				setIsError(false);
			}
		}
	}, [value]);

	if (!isError) {
		return (
			<>
				<h3>My Personal and delivery details</h3>
				<p>
					To edit your details please click on the area you wish to edit.
					Finally press update details to confirm.
				</p>
				<p className={styles.cardBlurb}>
					We do not store any of your credit card or debit card details, all
					payments are securely handled externally by{' '}
					<a href='https://stripe.com/gb' target='_blank' rel='noreferrer'>
						stripe
					</a>
				</p>
				{currentUser ? (
					<form onSubmit={(e) => handleUpdate(e)}>
						<Grid container spacing={3}>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									id='firstName'
									name='firstName'
									label='First name'
									fullWidth
									autoComplete='given-name'
									defaultValue={currentUser.firstName || ''}
									variant='standard'
									onChange={(e) => {
										setCurrentUser({
											...currentUser,
											firstName: e.target.value,
										});
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
									defaultValue={currentUser.lastName || ''}
									autoComplete='family-name'
									variant='standard'
									onChange={(e) => {
										setCurrentUser({
											...currentUser,
											lastName: e.target.value,
										});
									}}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									id='address1'
									name='address1'
									label='Address line 1'
									defaultValue={currentUser.address.addressLineOne}
									fullWidth
									autoComplete='shipping address-line1'
									variant='standard'
									onChange={(e) => {
										setCurrentUser({
											...currentUser,
											address: {
												...currentUser.address,
												addressLineOne: e.target.value,
											},
										});
									}}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									id='address2'
									name='address2'
									label='email'
									defaultValue={currentUser.email}
									required
									fullWidth
									autoComplete='shipping address-line2'
									variant='standard'
									onChange={(e) => {
										setCurrentUser({ ...currentUser, email: e.target.value });
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									id='city'
									name='city'
									label='City'
									defaultValue={currentUser.address.city}
									fullWidth
									autoComplete='shipping address-level2'
									variant='standard'
									onChange={(e) => {
										setCurrentUser({
											...currentUser,
											address: {
												...currentUser.address,
												city: e.target.value,
											},
										});
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									id='state'
									name='county'
									label='County'
									fullWidth
									defaultValue={currentUser.address.county}
									variant='standard'
									onChange={(e) => {
										setCurrentUser({
											...currentUser,
											address: {
												...currentUser.address,
												county: e.target.value,
											},
										});
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
									defaultValue={currentUser.address.postCode}
									variant='standard'
									onChange={(e) => {
										setCurrentUser({
											...currentUser,
											address: {
												...currentUser.address,
												postCode: e.target.value,
											},
										});
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
									defaultValue={currentUser.address.country}
									onChange={(e) => {
										setCurrentUser({
											...currentUser,
											address: {
												...currentUser.address,
												country: e.target.value,
											},
										});
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<FormControlLabel
									control={
										<Checkbox
											defaultChecked={currentUser.isPromtions ? true : false}
											onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
												setCurrentUser({
													...currentUser,
													isPromtions: e.target.checked,
												});
											}}
										/>
									}
									label='Get promotions and discounts'
								/>
							</Grid>
						</Grid>

						<div>
							<Button
								variant='contained'
								color='success'
								sx={{ marginTop: '3%' }}
								disabled={isLoading}
								type='submit'>
								Update Details
							</Button>
							{infoTxt !== '' ? <p> {infoTxt} </p> : ''}
						</div>
					</form>
				) : (
					<Loading />
				)}
			</>
		);
	} else {
		return <Loading />;
	}
};

export default MyDetails;
