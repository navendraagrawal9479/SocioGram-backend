import express from 'express'
import { search } from '../controllers/search.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/:key', verifyToken, search)

export default router;