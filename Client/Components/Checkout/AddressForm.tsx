import * as React from 'react';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

export default function AddressForm({ address, setAddress }: any) {
	return (
		<React.Fragment>
			<Typography variant='h6' gutterBottom>
				Shipping address
			</Typography>
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
						label='Address line 2'
						fullWidth
						autoComplete='shipping address-line2'
						variant='standard'
						onChange={(e) => {
							setAddress({ ...address, email: e.target.value });
						}}
					/>
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
		</React.Fragment>
	);
}
