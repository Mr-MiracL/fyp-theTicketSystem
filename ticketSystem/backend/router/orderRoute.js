import express from 'express';
import {
  createOrder,
  getOrdersByUser,
  getUserOrderById,
} from '../controllers/orderController.js';

const router = express.Router();


router.post('/orders', createOrder);

router.get('/orders/user/:userid', getOrdersByUser);

router.get('/orders/user/:userid/:orderid', getUserOrderById);

export default router;
