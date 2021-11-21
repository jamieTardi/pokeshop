import cart from '../models/cart.js';
import users from '../models/users.js';

export const createCart = async (req, res) => {
	const item = req.body;
	const userToken = req.query.id;

	const existingUser = await users.findOne({ refreshToken: userToken });
	try {
		if (existingUser) {
			const newCart = await cart.create({
				userRef: userToken,
				items: [item],
				isExistingUser: true,
			});
			res.status(201).json({ cart: newCart });
		} else {
			const newCart = await cart.create({
				userRef: '',
				items: [item],
				isExistingUser: false,
			});
			res.status(201).json({ cart: newCart });
		}
	} catch (err) {
		res.status(500).json({ message: 'Something went wrong creating cart.' });
	}
};

export const getCart = async (req, res) => {
	const { token } = req.query;

	const existingCart = await cart.find();

	if (!existingCart) {
		res.status(202).json({ message: 'No cart associated with this user yet.' });
	}

	try {
		const userCart = existingCart.filter((cart) => {
			return cart.userRef !== token;
		});

		return res.status(200).json({ cart: userCart[0] });
	} catch (err) {
		res.status(500).json({ message: 'Bugger, its gone wrong.' });
	}
};

// export const updateCategory = async (req, res) => {
// 	const { category, image, slug } = req.body;
// 	const { id } = req.params;

// 	const existingCat = categories.findById(id);

// 	!existingCat &&
// 		res.status(404).json({ message: 'this category does not exist' });

// 	try {
// 		await categories.findByIdAndUpdate(id, {
// 			category,
// 			image,
// 			slug,
// 		});
// 		res.status(203).json({ message: 'Item updated' });
// 	} catch (err) {
// 		res.status(500).json({ message: 'Server went boom :(' });
// 	}
// };
