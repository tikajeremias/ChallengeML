import express from 'express';
import { getItems, getItemDetail } from '../controllers/itemsController';

const router = express.Router();
router.get('/', getItems);
router.get('/:id', getItemDetail);
export default router;