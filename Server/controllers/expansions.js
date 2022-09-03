import expansions from "../models/expansions.js";

export const addExpansion = async (req, res) => {
	if (req.headers.apikey === process.env.API_KEY) {
		const { expansion, slug, image } = req.body;

		try {
			const existingExpansion = await expansions.findOne({ expansion });

			if (existingExpansion) {
				return res.status(403).json({
					message: "This expansion exists already, either delete/edit it or change the category.",
				});
			}

			const result = await expansions.create({
				expansion,
				slug,
				image,
				created: Date.now(),
			});
			return res.status(201).json({ createdExpansion: result });
		} catch (err) {
			res.status(500).json({ message: "something went wrong" });
		}
	} else {
		res.status(404).json({ message: "Wrong Key" });
	}
};

export const getExpansions = async (req, res) => {
	if (req.headers.apikey === process.env.API_KEY) {
		try {
			const allExps = await expansions.find().sort({ created: -1 });
			return res.status(200).json({ expansions: allExps });
		} catch (err) {
			res.status(500).json({ message: "Bugger, its gone wrong." });
		}
	} else {
		res.status(404).json({ message: "Wrong Key" });
	}
};

export const updateExpansion = async (req, res) => {
	if (req.headers.apikey === process.env.API_KEY) {
		const { expansion, image, slug } = req.body;
		const { id } = req.params;

		const existingExp = expansions.findById(id);

		!existingExp && res.status(404).json({ message: "this category does not exist" });

		try {
			await expansions.findByIdAndUpdate(id, {
				expansion,
				image,
				slug,
			});
			res.status(203).json({ message: "Item updated" });
		} catch (err) {
			res.status(500).json({ message: "Server went boom :(" });
		}
	} else {
		res.status(404).json({ message: "Wrong Key" });
	}
};

export const deleteExpansion = async (req, res) => {
	if (req.headers.apikey === process.env.API_KEY) {
		const { id } = req.params;

		if (!expansions.findById(id)) {
			res.status(404).json("Expansion not found");
		}
		try {
			await expansions.findByIdAndDelete(id);
			res.status(203).json("Expansion deleted!");
		} catch (err) {
			res.status(500).json("Something went wrong..");
		}
	} else {
		res.status(404).json({ message: "Wrong Key" });
	}
};
