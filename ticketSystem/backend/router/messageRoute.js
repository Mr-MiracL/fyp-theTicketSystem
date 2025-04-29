import express from 'express';
import {
  sendMessage,
  getUserMessages,
  getAllMessagesForAdmin,
  replyToMessage
} from '../controllers/messageController.js';

import { verifyToken, verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// 普通用户发送消息
router.post('/', verifyToken, sendMessage);

// 普通用户获取自己消息
router.get('/user', verifyToken, getUserMessages);

// 管理员获取所有消息
router.get('/all', verifyToken, verifyAdmin, getAllMessagesForAdmin);

// 管理员回复某条消息
router.put('/:id/reply', verifyToken, verifyAdmin, replyToMessage);

export default router;

