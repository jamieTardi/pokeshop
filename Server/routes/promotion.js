import express from 'express';

import {
	createPromotion,
	getPromotions,
	updatePromotions,
	checkPromo,
	deletePromotion,
} from '../controllers/promotions.js';

const router = express.Router();

router.post('/', createPromotion);
router.get('/', getPromotions);
router.patch('/:id', updatePromotions);
router.delete('/:id', deletePromotion);

router.get('/check', checkPromo);

export default router;
