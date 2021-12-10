import orders from '../models/orders.js';

export const addOrder = async (req, res) => {
	console.log(req);

	const allOrders = await orders.find();
	const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
	let orderLetters = [];

	for (let i = 0; i < 4; i++) {
		let num = Math.floor(Math.random() * 10);
		orderLetters.push(letters[num]);
		console.log(num);
	}
	console.log(orderLetters);
	const orderNumber =
		'poke-' + orderLetters.join('') + '-' + '000' + allOrders.length.toString();

	console.log(orderNumber);
	//continue here tommoro
};
