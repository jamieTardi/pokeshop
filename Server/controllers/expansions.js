import expansions from '../models/expansions.js';

export const addExpansion = async (req, res) => {
	const { expansion, slug, image } = req.body;

	try {
		const existingExpansion = await expansions.findOne({ expansion });

		if (existingExpansion) {
			return res.status(403).json({
				message:
					'This expansion exists already, either delete/edit it or change the category.',
			});
		}

		const result = await expansions.create({
			expansion,
			slug,
			image,
		});
		return res.status(201).json({ createdExpansion: result });
	} catch (err) {
		res.status(500).json({ message: 'something went wrong' });
	}
};

export const getExpansions = async (req, res) => {
	try {
		const allExps = await expansions.find();
		return res.status(200).json({ expansions: allExps });
	} catch (err) {
		res.status(500).json({ message: 'Bugger, its gone wrong.' });
	}
};

export const updateExpansion = async (req, res) => {
	const { expansion, image, slug } = req.body;
	const { id } = req.params;

	const existingExp = expansions.findById(id);

	!existingExp &&
		res.status(404).json({ message: 'this category does not exist' });

	try {
		await expansions.findByIdAndUpdate(id, {
			expansion,
			image,
			slug,
		});
		res.status(203).json({ message: 'Item updated' });
	} catch (err) {
		res.status(500).json({ message: 'Server went boom :(' });
	}
};
