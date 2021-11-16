import express from 'express';

import {
	addProduct,
	getAllProducts,
	deleteProduct,
	updateProduct,
	getProductByCat,
} from '../controllers/products.js';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', addProduct);
router.delete('/:id', deleteProduct);
router.patch('/:id', updateProduct);
router.get('/:cat', getProductByCat);

export default router;
