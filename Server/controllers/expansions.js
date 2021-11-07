import expansions from '../models/expansions.js';

export const addExpansion = async (req, res) => {
	const { expansion } = req.body;

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
