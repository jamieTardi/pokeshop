import express from 'express';

import { createPayment } from '../controllers/stripe.js';

const router = express.Router();

router.post('/', createPayment);

export default router;
