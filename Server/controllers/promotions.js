import promotions from '../models/promotions.js';
import { shipping } from '../lib/variables.js';

export const createPromotion = async (req, res) => {
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
};

export const getPromotions = async (req, res) => {
	try {
		const allPromotions = await promotions.find();

		res.status(200).json(allPromotions);
	} catch (err) {
		res.status(500).json('Something went wrong...');
	}
};

export const updatePromotions = async (req, res) => {
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
};

export const checkPromo = async (req, res) => {
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
};
