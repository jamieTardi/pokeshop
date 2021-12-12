import products from '../models/products.js';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import { shipping } from '../lib/variables.js';

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (cartItems) => {
	let items = new Array();
	let total = new Array();
	let cartTotal = 0;
	let finalTotal = 0;

	cartItems.forEach((item) => {
		return items.push(item);
	});

	if (items.length !== 0) {
		items.forEach((item) => {
			return total.push(item.price);
		});
	}
	if (total.length !== 0) {
		cartTotal = total.reduce((prev, curr) => prev + curr);
	}

	if (cartTotal !== 0) {
		finalTotal = (shipping + cartTotal) * 100;
	}

	return finalTotal;
};

//fix amount
export const createPayment = async (req, res) => {
	let total = calculateOrderAmount(req.body);
	const paymentIntent = await stripe.paymentIntents.create({
		amount: total,
		currency: 'gbp',
		// automatic_payment_methods: {
		// 	enabled: true,
		// },
	});
	res.send({
		clientSecret: paymentIntent.client_secret,
		total,
	});
};
