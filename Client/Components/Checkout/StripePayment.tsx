import React, { useEffect, useState } from 'react';
import {
	PaymentElement,
	useStripe,
	useElements,
} from '@stripe/react-stripe-js';
import stripeCSS from '../../styles/Stripe.module.scss';
import { createOrder } from '../../api';

interface payment {
	paymentIntent: { status: string };
}

export default function CheckoutForm({ clientData, address }: any) {
	const stripe = useStripe();
	const elements = useElements();
	const [error, setError] = useState<boolean>(false);
	const [message, setMessage] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [total, setTotal] = useState<string>('');
	const order = JSON.parse(localStorage.getItem('poke-cart') || '{}');
	const fullTotal: number = clientData.total / 100;

	useEffect(() => {
		if (clientData) {
			setTotal(
				fullTotal - Math.floor(fullTotal) === 0
					? fullTotal.toString() + '.00'
					: fullTotal.toString(),
			);
		}
	}, [clientData]);

	useEffect(() => {
		if (!stripe) {
			return;
		}

		const clientSecret = new URLSearchParams(window.location.search).get(
			'payment_intent_client_secret',
		);

		if (!clientSecret) {
			return;
		}

		stripe
			.retrievePaymentIntent(clientSecret)
			.then(({ paymentIntent }: any) => {
				switch (paymentIntent.status) {
					case 'succeeded':
						createOrder(order, address, total);
						break;
					case 'processing':
						setMessage('Your payment is processing.');
						break;
					case 'requires_payment_method':
						setMessage('Your payment was not successful, please try again.');
						break;
					default:
						setMessage('Something went wrong.');
						break;
				}
			});
	}, [stripe]);

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		if (!stripe || !elements) {
			// Stripe.js has not yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return;
		}

		setIsLoading(true);

		try {
			if (stripe.confirmPayment) {
				if (stripe) {
					createOrder(order, address, total);
					localStorage.removeItem('poke-cart');
				}
				await stripe
					.confirmPayment({
						elements,
						confirmParams: {
							// Make sure to change this to your payment completion page
							receipt_email: address.email,
							return_url: 'http://localhost:3000/checkout',
							payment_method_data: {
								billing_details: {
									name: `${address.firstName} ${address.lastName}`,
									email: address.email,
									address: {
										line1: address.addressLineOne,
										city: address.city,
										state: address.county,
										country: address.country,
										postal_code: address.postCode,
									},
								},
							},
						},
					})
					.then(() => console.log(setError(true)))
					.catch(() => setMessage('There was an error'));
			}
		} catch (err) {
			setMessage('There was an error');
		}
		// createOrder(order, address, total);

		// This point will only be reached if there is an immediate error when
		// confirming the payment. Otherwise, your customer will be redirected to
		// your `return_url`. For some payment methods like iDEAL, your customer will
		// be redirected to an intermediate site first to authorize the payment, then
		// redirected to the `return_url`.

		setIsLoading(false);
	};

	return (
		<form
			id='payment-form'
			onSubmit={handleSubmit}
			className={stripeCSS.container}
			style={{ zIndex: 30, position: 'relative' }}>
			<PaymentElement id='payment-element' />
			<button
				disabled={isLoading || !stripe || !elements}
				id='submit'
				style={{ zIndex: 30 }}>
				<span id='button-text' style={{ zIndex: 30 }}>
					{isLoading ? (
						<div className='spinner' id='spinner'></div>
					) : (
						`Pay now £${total}`
					)}
				</span>
			</button>
			{/* Show any error or success messages */}
			{message && <div id='payment-message'>{message}</div>}
		</form>
	);
}
