import express from 'express';

import { createPayment, createPaymentUpdate } from '../controllers/stripe.js';

const router = express.Router();

router.post('/', createPayment);
router.post('/update', createPaymentUpdate);

export default router;
