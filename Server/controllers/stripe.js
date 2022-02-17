import products from '../models/products.js';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (cartItems) => {
	let items = new Array();
	let total = new Array();
	let cartTotal = 0;
	let finalTotal = 0;
	let shipping = 0;

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
		if (cartTotal < 50) {
			shipping = 4;
		} else if (cartTotal >= 50 && cartTotal < 100) {
			shipping = 2;
		} else {
			shipping = 0;
		}
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
		amount: total.toFixed(0),
		currency: 'gbp',
	});
	res.send({
		clientSecret: paymentIntent.client_secret,
		total,
	});
};

export const createPaymentUpdate = async (req, res) => {
	const { total } = req.body;

	const { paymentIntent } = req.query;

	const strippedStr = paymentIntent.substring(0, 27);

	const newPaymentIntent = await stripe.paymentIntents.update(strippedStr, {
		amount: total,
	});

	res.send({
		clientSecret: newPaymentIntent.client_secret,
		total,
	});
};
