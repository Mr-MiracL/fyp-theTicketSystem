import express from 'express';
import { sendMessage, getUserMessages, getAllMessagesForAdmin, replyToMessage } from '../controllers/messageController.js';
import { verifyToken, verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();


router.post('/', verifyToken, sendMessage);

// 用户查看自己的消息
router.get('/user/messages', verifyToken, getUserMessages);

// 管理员查看所有消息
router.get('/messages', verifyToken, verifyAdmin, getAllMessagesForAdmin);

// 管理员回复消息
router.put('/:id', verifyToken, verifyAdmin, replyToMessage);

export default router;
