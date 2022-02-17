import React, { useEffect, useState } from 'react';
import {
	PaymentElement,
	useStripe,
	useElements,
} from '@stripe/react-stripe-js';
import stripeCSS from '../../styles/Stripe.module.scss';
import { createOrder, createOrderToken } from '../../api';
import { useAppDispatch } from '../../Redux/hooks';
import ProcessingPayment from './ProcessingPayment';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

import { useCookies } from 'react-cookie';

export default function CheckoutForm({
	clientData,
	address,
	updateTotal,
}: any) {
	const [open, setOpen] = useState<boolean>(false);
	const stripe = useStripe();
	const elements = useElements();
	const [error, setError] = useState<boolean>(false);
	const [message, setMessage] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [total, setTotal] = useState<string>('');
	const order = localStorage.getItem('poke-cart') || '{}';
	const fullTotal: number = clientData.total / 100;
	const [cookies, setCookie, removeCookie] = useCookies<any>();
	const clientSecret = new URLSearchParams(window.location.search).get(
		'payment_intent_client_secret',
	);

	const orderToken = uuidv4();

	useEffect(() => {
		if (clientData) {
			setTotal(fullTotal.toFixed(2).toString());
		}
	}, [clientData]);

	useEffect(() => {
		if (total !== '') {
			createOrderToken({ token: orderToken }, address, order, total);
			setCookie('orderToken', orderToken, { maxAge: 1800 });
		}
	}, [total]);

	useEffect(() => {
		if (updateTotal) {
			removeCookie('orderToken', { path: '/' });
			createOrderToken(
				{ token: orderToken },
				address,
				order,
				updateTotal.newTotal,
			);
			setCookie('orderToken', orderToken, { maxAge: 1800 });
		}
	}, [updateTotal]);

	useEffect(() => {
		if (!stripe) {
			return;
		}

		if (!clientSecret) {
			return;
		}

		stripe
			.retrievePaymentIntent(clientSecret)
			.then(({ paymentIntent }: any) => {
				switch (paymentIntent.status) {
					case 'succeeded':
						createOrder(JSON.parse(order), address, total);
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
	}, []);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setOpen(true);
		setIsLoading(true);
		if (!stripe || !elements) {
			// Stripe.js has not yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			setOpen(false);
			setIsLoading(false);
			return;
		}

		try {
			if (clientData) {
				const result = await stripe.confirmPayment({
					elements,
					confirmParams: {
						// Make sure to change this to your payment completion page
						receipt_email: address.email,
						return_url: 'https://poke-decks.io/thankyou',
						// return_url: 'http://localhost:3000/thankyou',
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
				});
				if (result.error) {
					// Show error to your customer (e.g., payment details incomplete)
					setOpen(false);
					console.log(result.error.message);
				} else {
					setOpen(false);
					console.log('created');
				}
				setOpen(false);
				setIsLoading(false);
			}
		} catch (err) {
			setIsLoading(false);
			setMessage('There was an error');
		}

		setIsLoading(false);
	};

	return (
		<>
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
							`Pay now £${
								updateTotal ? (updateTotal.newTotal / 100).toFixed(2) : total
							}`
						)}
					</span>
				</button>
				{/* Show any error or success messages */}
				{message && <div id='payment-message'>{message}</div>}
			</form>
			<ProcessingPayment open={open} setOpen={setOpen} />
		</>
	);
}
