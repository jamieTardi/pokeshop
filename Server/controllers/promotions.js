import promotions from '../models/promotions.js';
import { shipping } from '../lib/variables.js';

export const createPromotion = async (req, res) => {
	if (req.headers.apikey === process.env.API_KEY) {
		const { title, discount, isActive } = req.body;

		const existingPromotion = await promotions.findOne({ title });

		if (existingPromotion) {
			res.status(200).json('This promotion already exists.');
		}
		try {
			await promotions.create({
				title,
				discount,
				isActive,
			});
			res.status(201).json('New promotion created!');
		} catch (err) {
			res.status(500).json('Something went wrong...');
		}
	} else {
		res.status(404).json({ message: 'Wrong Key' });
	}
};

export const getPromotions = async (req, res) => {
	if (req.headers.apikey === process.env.API_KEY) {
		try {
			const allPromotions = await promotions.find();

			res.status(200).json(allPromotions);
		} catch (err) {
			res.status(500).json('Something went wrong...');
		}
	} else {
		res.status(404).json({ message: 'Wrong Key' });
	}
};

export const updatePromotions = async (req, res) => {
	if (req.headers.apikey === process.env.API_KEY) {
		const { id } = req.params;
		const promotion = req.body;

		const existingPromo = await promotions.findById(id);

		if (!existingPromo) {
			req.status(404).json('Not Found');
		}
		try {
			await promotions.findByIdAndUpdate(id, { ...promotion });
			res.status(203).json('Update successfully!');
		} catch {
			res.status(500).json('Somethign went wrong..');
		}
	} else {
		res.status(404).json({ message: 'Wrong Key' });
	}
};

export const checkPromo = async (req, res) => {
	if (req.headers.apikey === process.env.API_KEY) {
		const { code, total } = req.query;

		const existingCode = await promotions.findOne({ title: code });

		if (!existingCode) {
			res.status(403).json('Code does not exist.');
		} else if (existingCode && existingCode.isActive) {
			const { discount } = existingCode;
			const noShipTotal = total - shipping * 100;
			const percentOff = (discount / 100) * noShipTotal;

			const newTotal = (noShipTotal - percentOff + shipping * 100).toFixed();

			try {
				res.status(201).json({
					discount: discount.toString() + '%',
					newTotal: newTotal,
					isActive: true,
				});
			} catch {
				res.status(500).json('An error has happened.');
			}
		} else {
			res.status(500).json('Code is not active.');
		}
	} else {
		res.status(404).json({ message: 'Wrong Key' });
	}
};

export const deletePromotion = async (req, res) => {
	if (req.headers.apikey === process.env.API_KEY) {
		const { id } = req.params;

		const existingPromo = await promotions.findById(id);

		if (!existingPromo) {
			res.status(404).json('The promotion was not found.');
		}
		try {
			const deletedPromo = await promotions.findByIdAndDelete(id);
			res.status(203).json(deletedPromo);
		} catch (err) {
			res.status(500).json(err.message);
		}
	} else {
		res.status(404).json({ message: 'Wrong Key' });
	}
};
