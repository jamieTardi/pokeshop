import products from '../models/products.js';

export const addProduct = async (req, res) => {
	const { price, SKU } = req.body;
	const body = req.body;
	let newPrice = parseInt(price);
	try {
		const existingProduct = await products.findOne({ SKU: req.body.SKU });
		if (existingProduct) {
			return res.status(403).json({
				message:
					'This product exists already, either delete/edit it or change the SKU.',
			});
		}
		const result = await products.create({
			...body,
			price: newPrice,
		});
		return res.status(201).json({ createdProduct: result });
	} catch (err) {
		res.status(500).json({ message: 'something went wrong' });
	}
};
