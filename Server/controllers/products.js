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

export const getAllProducts = async (req, res) => {
	try {
		const allProducts = await products.find();
		res.status(200).json(allProducts);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

export const deleteProduct = async (req, res) => {
	const { id } = req.params;
	try {
		await products.findByIdAndDelete(id);
		res
			.status(204)
			.json({ message: 'Item has been removed from the database.' });
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

export const updateProduct = async (req, res) => {
	const { id } = req.params;
	const body = req.body;

	const existingProduct = await products.findById(id);

	if (!existingProduct) {
		res.status(404).json({ message: 'Item does not exist in the database.' });
	}
	try {
		const updatedItem = await products.findByIdAndUpdate(id, {
			...body,
		});
		res.status(204).json(updatedItem);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

export const getProductByCat = async (req, res) => {
	const { cat } = req.params;
	const existingCat = await products.find({ category: cat });

	try {
		if (!existingCat) {
			res.status(403).json({
				message: 'Category not found, please refresh the page or try again.',
			});
		}

		res.status(202).json(existingCat);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

export const getProductByExp = async (req, res) => {
	const { exp } = req.params;

	const existingExp = await products.find({ expansion: exp });

	try {
		if (!existingExp) {
			res.status(403).json({
				message: 'Category not found, please refresh the page or try again.',
			});
		}

		res.status(202).json(existingExp);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};
