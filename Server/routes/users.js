import express from 'express';

import { signup, signin, tokenReq } from '../controllers/users.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/token', tokenReq)

export default router;
