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

const stripePromise = loadStripe(
	'pk_live_51K1SFhJzDUpYRbdF7dL2wZCWNtFNbB1YflwwRkIN4SzG4kbabjCjmv1WZ5DCoFDBLc7JfhJ20E08l1nnpXAzZdHf00TgUzSlsn',
);
interface props {
	address: { email: string };
}

export default function PaymentForm({ address }: props) {
	const cartItems: object[] = useAppSelector(
		(state: RootState) => state.cart.value,
	);

	const [clientSecret, setClientSecret] = useState<string>('');
	useEffect(() => {
		updateAddress(address.email);
	}, []);

	useEffect(() => {
		// Create PaymentIntent as soon as the page loads

		paymentIntent(cartItems, setClientSecret);
	}, []);

	const appearance = {
		theme: 'stripe',
	};

	const options = {
		clientSecret,
		appearance,
	};

	return (
		<React.Fragment>
			{clientSecret && (
				<Elements options={options} stripe={stripePromise}>
					<Typography variant='h6' gutterBottom>
						Payment method
					</Typography>
					<Grid container spacing={3}>
						<Stripe />
					</Grid>
				</Elements>
			)}
		</React.Fragment>
	);
}
