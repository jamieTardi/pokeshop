import orders from '../models/orders.js';

export const addOrder = async (req, res) => {
	console.log(req);

	const allOrders = await orders.find();

	const orderNumber = 'poke-order-' + '' + '000' + allOrders.length.toString();

	console.log(orderNumber);
	//continue here tommoro
};
