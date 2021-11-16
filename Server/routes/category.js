import express from 'express';

import {
	addCategory,
	getCategory,
	updateCategory,
} from '../controllers/category.js';

const router = express.Router();

router.get('/', getCategory);
router.post('/', addCategory);
router.patch('/:id', updateCategory);

export default router;
