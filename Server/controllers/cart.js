export const getCartTotal = async (req, res) => {
	if (req.headers.apikey === process.env.API_KEY) {
		const { cart } = req.query;
		let shipping = 0;
		let items = new Array();
		let total = new Array();
		let cartTotal = 0;
		let finalTotal = 0;
		try {
			await cart.forEach((item) => {
				return items.push(JSON.parse(item));
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
				if (cartTotal < 50) {
					shipping = 4;
				} else if (cartTotal >= 50 && cartTotal < 100) {
					shipping = 2;
				} else {
					shipping = 0;
				}
				finalTotal = shipping + cartTotal;
			}

			res.status(201).json({ cartTotal, shipping, finalTotal });
		} catch (err) {
			res.status(500).json({ message: err });
		}
	} else {
		res.status(404).json({ message: 'Wrong Key' });
	}
};
