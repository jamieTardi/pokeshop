import express from 'express';

import { createCart, getCart } from '../controllers/cart.js';

const router = express.Router();

router.get('/', getCart);
router.post('/', createCart);
// router.patch('/:id', updateCart);

export default router;
