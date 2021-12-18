import * as React from 'react';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { updateAddress } from '../../api';
import Stripe from './StripePayment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { paymentIntent } from '../../api';
import { RootState } from '../../Redux/store';
import Loading from '../UIComponents/Loading';

const stripePromise = loadStripe(
	// 'pk_live_51K1SFhJzDUpYRbdF7dL2wZCWNtFNbB1YflwwRkIN4SzG4kbabjCjmv1WZ5DCoFDBLc7JfhJ20E08l1nnpXAzZdHf00TgUzSlsn',
	'pk_test_51K1SFhJzDUpYRbdFeTG7fUPqFOyateqcC5npGrzkcDJv8THvb9bnqrjw35DrkOPgEYYLXbFUhsPQZrfnnQ6Zyrhu00NlnBkVDy',
);
interface props {
	address: { email: string };
}

export default function PaymentForm({ address }: props) {
	const cartItems: any = useAppSelector((state: RootState) => state.cart.value);

	const [clientSecret, setClientSecret] = useState<string>('');
	const [clientData, setClientData] = useState<null | {
		clientSecret: string;
		total: number;
	}>(null);

	useEffect(() => {
		// Create PaymentIntent as soon as the page loads

		paymentIntent(cartItems, setClientData);
	}, []);

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
							{clientData ? (
								<Stripe clientData={clientData} address={address} />
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
