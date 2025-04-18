import express from 'express';
import {
  createOrder,
  getOrdersByUser,
  getUserOrderById,
  deleteUserOrder,
} from '../controllers/orderController.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();


router.post('/', createOrder);

router.get('/user/:userid', getOrdersByUser);

router.get('/user/:userid/:orderid', getUserOrderById);
router.delete("/:userid/:orderid", verifyToken, deleteUserOrder);


export default router;
