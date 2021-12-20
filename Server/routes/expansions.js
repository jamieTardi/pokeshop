import express from 'express';

import {
	addExpansion,
	getExpansions,
	updateExpansion,
	deleteExpansion,
} from '../controllers/expansions.js';

const router = express.Router();

router.get('/', getExpansions);
router.post('/', addExpansion);
router.patch('/:id', updateExpansion);
router.delete('/:id', deleteExpansion);

export default router;
