import categories from '../models/category.js';

export const addCategory = async (req, res) => {
	if (req.headers.apikey === process.env.API_KEY) {
		const { category, image, slug } = req.body;

		try {
			const existingCategory = await categories.findOne({ category: category });
			if (existingCategory) {
				return res.status(403).json({
					message:
						'This category exists already, either delete/edit it or change the category.',
				});
			}

			const result = await categories.create({
				category,
				image,
				slug,
			});
			return res.status(201).json({ createdCategory: result });
		} catch (err) {
			res.status(500).json({ message: 'something went wrong' });
		}
	} else {
		res.status(404).json({ message: 'Wrong Key' });
	}
};

export const getCategory = async (req, res) => {
	if (req.headers.apikey === process.env.API_KEY) {
		try {
			const allCats = await categories.find();
			return res.status(200).json({ categories: allCats });
		} catch (err) {
			res.status(500).json({ message: 'Bugger, its gone wrong.' });
		}
	} else {
		res.status(404).json({ message: 'Wrong Key' });
	}
};

export const updateCategory = async (req, res) => {
	if (req.headers.apikey === process.env.API_KEY) {
		const { category, image, slug } = req.body;
		const { id } = req.params;

		const existingCat = categories.findById(id);

		!existingCat &&
			res.status(404).json({ message: 'this category does not exist' });

		try {
			await categories.findByIdAndUpdate(id, {
				category,
				image,
				slug,
			});
			res.status(203).json({ message: 'Item updated' });
		} catch (err) {
			res.status(500).json({ message: 'Server went boom :(' });
		}
	} else {
		res.status(404).json({ message: 'Wrong Key' });
	}
};

export const deleteCategory = async (req, res) => {
	if (req.headers.apikey === process.env.API_KEY) {
		const { id } = req.params;

		if (!categories.findById(id)) {
			res.status(404).json('Category not found');
		}
		try {
			await categories.findByIdAndDelete(id);
			res.status(203).json('Category deleted!');
		} catch (err) {
			res.status(500).json('Something went wrong..');
		}
	} else {
		res.status(404).json({ message: 'Wrong Key' });
	}
};
