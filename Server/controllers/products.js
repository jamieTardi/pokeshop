import products from "../models/products.js";

export const addProduct = async (req, res) => {
	if (req.headers.apikey === process.env.API_KEY) {
		const body = req.body;

		try {
			const existingProduct = await products.findOne({ SKU: req.body.SKU });
			if (existingProduct) {
				return res.status(403).json({
					message: "This product exists already, either delete/edit it or change the SKU.",
				});
			}
			const result = await products.create({
				...body,
				created: Date.now(),
			});
			return res.status(201).json({ createdProduct: result });
		} catch (err) {
			res.status(500).json({ message: "something went wrong" });
		}
	} else {
		res.status(404).json({ message: "Wrong Key" });
	}
};

export const getAllProducts = async (req, res) => {
	if (req.headers.apikey === process.env.API_KEY) {
		try {
			const allProducts = await products.find().sort({ created: -1 });
			res.status(200).json(allProducts);
		} catch (err) {
			res.status(500).json({ message: err });
		}
	} else {
		res.status(404).json({ message: "Wrong Key" });
	}
};

export const deleteProduct = async (req, res) => {
	if (req.headers.apikey === process.env.API_KEY) {
		const { id } = req.params;
		try {
			await products.findByIdAndDelete(id);
			res.status(204).json({ message: "Item has been removed from the database." });
		} catch (err) {
			res.status(500).json({ message: err });
		}
	} else {
		res.status(404).json({ message: "Wrong Key" });
	}
};

export const updateProduct = async (req, res) => {
	if (req.headers.apikey === process.env.API_KEY) {
		const { id } = req.params;
		const body = req.body;

		const existingProduct = await products.findById(id);

		if (!existingProduct) {
			res.status(404).json({ message: "Item does not exist in the database." });
		}
		try {
			const updatedItem = await products.findByIdAndUpdate(id, {
				...body,
			});
			res.status(204).json(updatedItem);
		} catch (err) {
			res.status(500).json({ message: err });
		}
	} else {
		res.status(404).json({ message: "Wrong Key" });
	}
};

export const getProductByCat = async (req, res) => {
	if (req.headers.apikey === process.env.API_KEY) {
		const { cat } = req.params;
		const existingCat = await products.find({ category: cat }).sort({ created: -1 });

		try {
			if (!existingCat) {
				res.status(403).json({
					message: "Category not found, please refresh the page or try again.",
				});
			}

			res.status(202).json(existingCat);
		} catch (err) {
			res.status(500).json({ message: err });
		}
	} else {
		res.status(404).json({ message: "Wrong Key" });
	}
};

export const getProductByExp = async (req, res) => {
	if (req.headers.apikey === process.env.API_KEY) {
		const { exp } = req.params;

		const existingExp = await products.find({ expansion: exp }).sort({ created: -1 });

		try {
			if (!existingExp) {
				res.status(403).json({
					message: "Category not found, please refresh the page or try again.",
				});
			}

			res.status(202).json(existingExp);
		} catch (err) {
			res.status(500).json({ message: err });
		}
	} else {
		res.status(404).json({ message: "Wrong Key" });
	}
};
