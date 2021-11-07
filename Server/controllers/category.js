import categories from '../models/category.js';

export const addCategory = async (req, res) => {
	const { category } = req.body;

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
		});
		return res.status(201).json({ createdCategory: result });
	} catch (err) {
		res.status(500).json({ message: 'something went wrong' });
	}
};

export const getCategory = async (req, res) => {
	try {
		const allCats = await categories.find();
		return res.status(200).json({ categories: allCats });
	} catch (err) {
		res.status(500).json({ message: 'Bugger, its gone wrong.' });
	}
};
