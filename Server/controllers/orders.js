import orders from '../models/orders.js';
import orderToken from '../models/orderToken.js';
import products from '../models/products.js';
import user from '../models/users.js';
import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import * as fs from 'fs';
import { shipping } from '../lib/variables.js';

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		// type: 'OAuth2',
		user: process.env.MAIL_USERNAME,
		pass: process.env.MAIL_PASSWORD,
		// clientId: process.env.OAUTH_CLIENTID,
		// clientSecret: process.env.OAUTH_CLIENT_SECRET,
		// refreshToken: process.env.OAUTH_REFRESH_TOKEN,
	},
});

export const getTempOrder = async (req, res) => {
	const { token } = req.query;

	const findOrder = await orderToken.findOne({ token });

	addOrder(findOrder);
};

export const createToken = async (req, res) => {
	const { token } = req.body;
	const orderedItems = JSON.parse(req.query.order[0]);
	const total = '£' + req.query.total;
	const address = JSON.parse(req.query.address);

	const subTotal = '£' + (req.query.total - shipping).toString() + '.00';
	const shippingStr = '£' + shipping.toString() + '.00';
	try {
		await orderToken.create({
			token,
			customer: address,
			items: orderedItems,
			subTotal,
			shippingStr,
			total,
			totalRaw: req.query.total,
			creationDate: new Date(),
		});
		res
			.status(201)
			.json('Temporary order created, this will be removed in 30 mins.');
	} catch (err) {
		res.status(500).json('Something gone wrong...');
	}
};

export const addOrder = async (order) => {
	const allItems = order.items;
	const total = order.total;
	const address = order.customer;
	const date = new Date();
	const currentDate = date.toLocaleString('en-US');
	const allOrders = await orders.find();
	const lineOne = address.addressLineOne;
	const county = address.county;
	const country = address.country;
	const postCode = address.postCode;

	let orderedItems = [];

	//Create order number
	const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
	let orderLetters = [];

	for (let i = 0; i < 4; i++) {
		let num = Math.floor(Math.random() * 10);
		orderLetters.push(letters[num]);
	}
	const orderNumber =
		'poke-' + orderLetters.join('') + '-' + '000' + allOrders.length.toString();
	const subTotal = '£' + (order.totalRaw - shipping).toString() + '.00';
	const shippingStr = '£' + shipping.toString() + '.00';

	// //Extract Item details

	allItems.forEach(async (item) => {
		const productToUpdate = await products.findOne({ SKU: item.SKU });
		try {
			let newItem = {
				title: item.title,
				SKU: item.SKU,
				price:
					item.price - Math.floor(item.price) === 0
						? '£' + item.price.toString() + '.00'
						: '£' + item.price.toString(),
			};
			orderedItems.push(newItem);

			await products.findByIdAndUpdate(productToUpdate._id, {
				title: productToUpdate.title,
				price: productToUpdate.price,
				image: productToUpdate.image,
				description: productToUpdate.description,
				expansion: productToUpdate.expansion,
				category: productToUpdate.category,
				SKU: productToUpdate.SKU,
				releaseDate: productToUpdate.releaseDate,
				stockAmount: productToUpdate.stockAmount - 1,
				preOrder: productToUpdate.preOrder,
			});
		} catch (err) {
			console.log(err);
		}
	});

	try {
		//Creation of new order
		await orders.create({
			orderNo: orderNumber,
			customer: address,
			items: orderedItems,
			subTotal,
			shippingStr,
			total,
			totalRaw: order.totalRaw,
			orderDate: currentDate,
			isShipped: false,
		});

		//Email System for orders

		//Email specfic variables

		//Email logic for order
		fs.readFile(
			'emails/purchaseEmail.html',
			{ encoding: 'utf-8' },
			function (err, html) {
				if (err) {
					console.log(err);
				} else {
					let template = handlebars.compile(html);
					let data = {
						username: address.firstName,
						orderNumber,
						total,
						lineOne,
						country,
						county,
						postCode,
						subTotal,
						shippingStr,
						orderDate: currentDate,
						items: orderedItems,
						shippingPrice: shipping,
					};
					let mailList = [address.email];
					let htmlToSend = template(data);
					let mailOptions = {
						from: process.env.MAIL_USERNAME,
						to: mailList,
						subject: 'Your order from Poke Decks!',
						html: htmlToSend,
					};
					transporter.sendMail(mailOptions, function (error, info) {
						if (error) {
							console.log(error);
						} else {
							console.log('Email sent: ' + info.response);
						}
					});
				}
			},
		);

		fs.readFile(
			'emails/emailAlert.html',
			{ encoding: 'utf-8' },
			function (err, html) {
				if (err) {
					console.log(err);
				} else {
					let template = handlebars.compile(html);
					let data = {
						username: address.firstName,
						orderNumber,
						total,
						orderDate: currentDate,
						items: orderedItems,
						shippingPrice: shipping,
					};
					let mailList = ['laura.walpole.173@gmail.com'];
					let htmlToSend = template(data);
					let mailOptions = {
						from: process.env.MAIL_USERNAME,
						to: mailList,
						subject: 'New order alert!',
						html: htmlToSend,
					};
					transporter.sendMail(mailOptions, function (error, info) {
						if (error) {
							console.log(error);
						} else {
							console.log('Email sent: ' + info.response);
						}
					});
				}
			},
		);

		//Once complete delete temp order
		await orderToken.findOneAndDelete({ token: order.token });
	} catch (err) {
		console.log(err);
	}
};

export const getAllOrders = async (req, res) => {
	try {
		const allOrders = await orders.find();
		res.status(200).json(allOrders);
	} catch (err) {
		res.status(500).json({
			message: 'Error getting order data, please refresh and try again.',
		});
	}
};

export const getTotals = async (req, res) => {
	const allOrders = await orders.find();
	let total = 0;

	try {
		allOrders.forEach((order) => {
			const dateTime = order.orderDate;

			let month = dateTime.getMonth() + 1;
			let year = dateTime.getFullYear();

			let currentdate = new Date();
			let cur_month = currentdate.getMonth() + 1;
			let cur_year = currentdate.getFullYear();

			if (cur_month == month && year == cur_year) {
				total += order.totalRaw;
			}
		});

		res.status(200).json({ total });
	} catch (err) {
		res.status(500).json({ message: 'Something went wrong' });
	}
};

export const getDailyTotals = async (req, res) => {
	let totals = {
		current: 0,
		previousLess1: 0,
		previousLess2: 0,
		previousLess3: 0,
		previousLess4: 0,
		previousLess5: 0,
		previousLess6: 0,
	};

	const date = new Date();
	const today = date.getDay();
	const allOrders = await orders.find();

	try {
		allOrders.forEach((order) => {
			let day = today;
			let orderDate = order.orderDate.getDay();

			if (orderDate === day) {
				totals.current += 1;
			} else if (orderDate === day - 1) {
				totals.previousLess1 += 1;
			} else if (orderDate === day - 2) {
				totals.previousLess2 += 1;
			} else if (orderDate === day - 3) {
				totals.previousLess3 += 1;
			} else if (orderDate === day - 4) {
				totals.previousLess4 += 1;
			} else if (orderDate === day - 5) {
				totals.previousLess5 += 1;
			} else if (orderDate === day - 6) {
				totals.previousLess6 += 1;
			}
		});
		res.status(201).json({ totals });
	} catch (err) {
		res.status(500).json({ message: 'Calculation has gone wrong....' });
	}
};

export const deleteOrder = async (req, res) => {
	const { id } = req.params;

	try {
		const deleted = await orders.findByIdAndDelete(id);
		res.status(203).json(deleted);
	} catch (err) {
		res.status(500).json({ message: 'Something went wrong!' });
	}
};

export const updateShipping = async (req, res) => {
	const { id } = req.params;
	const currentOrder = req.body;
	const orderDate = currentOrder.orderDate.toLocaleString('en-GB');
	const shippingStr = '£' + shipping.toString() + '.00';
	const subTotal = currentOrder.total - shipping;
	try {
		const update = await orders.findByIdAndUpdate(id, {
			...currentOrder,
			isShipped: true,
		});

		fs.readFile(
			'emails/shipped.html',
			{ encoding: 'utf-8' },
			function (err, html) {
				if (err) {
					console.log(err);
				} else {
					let template = handlebars.compile(html);
					let data = {
						username: currentOrder.customer.firstName,
						orderNumber: currentOrder.orderNo,
						orderDate,
						shippingStr,
						subTotal,
						items: currentOrder.items,
						total: currentOrder.total,
					};
					let mailList = [currentOrder.customer.email];
					let htmlToSend = template(data);
					let mailOptions = {
						from: process.env.MAIL_USERNAME,
						to: mailList,
						subject: 'Your order from Poke Decks has shipped!',
						html: htmlToSend,
					};
					transporter.sendMail(mailOptions, function (error, info) {
						if (error) {
							console.log(error);
						} else {
							console.log('Email sent: ' + info.response);
						}
					});
				}
			},
		);

		res.status(203).json(update);
	} catch (err) {
		res.status(500).json({ message: 'Somthing has gone wrong...' });
	}
};
