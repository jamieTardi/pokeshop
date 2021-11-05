import express from 'express';

import { signup, signin, getAllUsers } from '../controllers/users.js';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/signup', signup);
router.post('/signin', signin);

export default router;
