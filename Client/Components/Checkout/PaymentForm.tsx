import * as React from 'react';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Grid, TextField, Button } from '@mui/material';

import Stripe from './StripePayment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { applyPromoCode, paymentIntent, updatePaymentIntent } from '../../api';
import { RootState } from '../../Redux/store';
import Loading from '../UIComponents/Loading';

const stripePromise = loadStripe(
	'pk_live_51K1SFhJzDUpYRbdF7dL2wZCWNtFNbB1YflwwRkIN4SzG4kbabjCjmv1WZ5DCoFDBLc7JfhJ20E08l1nnpXAzZdHf00TgUzSlsn',
	// 'pk_test_51K1SFhJzDUpYRbdFeTG7fUPqFOyateqcC5npGrzkcDJv8THvb9bnqrjw35DrkOPgEYYLXbFUhsPQZrfnnQ6Zyrhu00NlnBkVDy',
);
interface props {
	address: { email: string };
}

interface newTotal {
	updateTotal: {};
	discount: string;
	newTotal: number;
	isActive: boolean;
}

export default function PaymentForm({ address }: props) {
	const cartItems: any = useAppSelector((state: RootState) => state.cart.value);
	const [promCode, setPromCode] = useState<string>('');
	const [clientSecret, setClientSecret] = useState<string>('');
	const [updateTotal, setUpdateTotal] = useState<newTotal | null>(null);
	const [errorMsg, setErrorMsg] = useState<null | string>(null);
	const [clientData, setClientData] = useState<null | {
		clientSecret: any;
		total: number;
	}>(null);

	const handleSubmitCode = () => {
		setUpdateTotal(null);
		if (clientData) {
			applyPromoCode(promCode, clientData.total, setUpdateTotal, setErrorMsg);
		}
	};

	useEffect(() => {
		// Create PaymentIntent as soon as the page loads
		if (updateTotal) {
			updatePaymentIntent(
				{ total: updateTotal.newTotal },
				setClientData,
				clientData?.clientSecret,
			);
		} else {
			paymentIntent(cartItems, setClientData);
		}
	}, [updateTotal]);

	useEffect(() => {
		if (clientData) {
			setClientSecret(clientData.clientSecret);
		}
	}, [clientData]);

	const appearance = {
		theme: 'stripe',
	};

	const options: object = {
		clientSecret,
		appearance,
	};

	return (
		<div style={{ zIndex: 30 }}>
			{clientSecret && (
				<Grid container spacing={3}>
					<Elements options={options} stripe={stripePromise}>
						<Grid item xs={12}>
							<Typography variant='h6' gutterBottom>
								Payment method
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography variant='subtitle2' gutterBottom>
								Promotional Code (optional)
							</Typography>
							<TextField
								margin='normal'
								fullWidth
								name='code'
								placeholder='POKE-CODE-1234'
								type='text'
								onChange={(e) => setPromCode(e.target.value)}
							/>
							<Button
								variant='contained'
								color='primary'
								disabled={updateTotal?.isActive}
								onClick={handleSubmitCode}>
								Apply Code
							</Button>
							{updateTotal && (
								<p>
									Discount applied! You get {updateTotal.discount} off your
									order! 🎉
								</p>
							)}
							{errorMsg && <p>{errorMsg}</p>}
						</Grid>
						<Grid item xs={12}>
							{clientData ? (
								<Stripe
									clientData={clientData}
									address={address}
									updateTotal={updateTotal}
								/>
							) : (
								<Loading />
							)}
						</Grid>
					</Elements>
				</Grid>
			)}
		</div>
	);
}
