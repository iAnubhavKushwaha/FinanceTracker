// server/routes/transactionRoutes.js

import express from 'express';
import { protect } from '../middleware/auth.js';
import { addTransaction, getTransactions, deleteTransaction } from '../controllers/transactionControllers.js';

const router = express.Router();

router.post('/', protect, addTransaction);
router.get('/', protect, getTransactions);
router.delete('/:id', protect, deleteTransaction);

export default router;
