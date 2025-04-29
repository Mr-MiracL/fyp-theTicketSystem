import express from 'express';
import {
  sendMessage,
  getUserMessages,
  getAllMessagesForAdmin,
  replyToMessage
} from '../controllers/messageController.js';

import { verifyToken, verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();


router.post('/', verifyToken, sendMessage);

router.get('/user', verifyToken, getUserMessages);

router.get('/all', verifyToken, verifyAdmin, getAllMessagesForAdmin);

router.put('/reply/:id', verifyToken, verifyAdmin, replyToMessage);

export default router;

