import express from 'express';
import {
  createOrder,
  getOrdersByUser,
  getUserOrderById,
  deleteUserOrder,
  cancelUserOrder,
  //checkTicketPurchase,
} from '../controllers/orderController.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();


router.post('/', createOrder);

router.get('/user/:userid', getOrdersByUser);

router.get('/user/:userid/:orderid', getUserOrderById);
router.delete("/:userid/:orderid", verifyToken, deleteUserOrder);

router.put('/:userid/:orderid/cancel', verifyToken, cancelUserOrder);
export default router;
