import express from 'express';

import {
	addProduct,
	getAllProducts,
	deleteProduct,
	updateProduct,
	getProductByCat,
	getProductByExp,
} from '../controllers/products.js';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', addProduct);
router.delete('/:id', deleteProduct);
router.patch('/:id', updateProduct);
router.get('/:cat', getProductByCat);
router.get('/expansions/:exp', getProductByExp);

export default router;
