import Message from '../models/messages.js';
import jwt from 'jsonwebtoken';

// 发送消息
export const sendMessage = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { message } = req.body;
    if (!message || message.trim() === '') {
      return res.status(400).json({ message: 'Message content is required' });
    }

    const newMessage = new Message({
      user: userId,
      message,
    });

    await newMessage.save();
    res.status(201).json({ message: 'Message sent successfully', data: newMessage });
  } catch (error) {
    console.error('Send Message Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// 普通用户获取自己消息
export const getUserMessages = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const messages = await Message.find({ user: userId }).populate('user', 'username email');
    res.status(200).json({ data: messages });
  } catch (err) {
    console.error('Get User Messages Error:', err);
    res.status(500).json({ message: err.message });
  }
};

// 管理员获取全部消息
export const getAllMessagesForAdmin = async (req, res) => {
  try {
    const messages = await Message.find().populate('user', 'username email').sort({ createdAt: -1 });
    res.status(200).json({ data: messages });
  } catch (error) {
    console.error('Admin Get All Messages Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// 管理员回复用户消息
export const replyToMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { reply } = req.body;

    if (!reply || reply.trim() === '') {
      return res.status(400).json({ message: 'Reply content is required' });
    }

    const updatedMessage = await Message.findByIdAndUpdate(
      id,
      { reply },
      { new: true }
    ).populate('user', 'username email');

    if (!updatedMessage) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.status(200).json({ message: 'Reply added', data: updatedMessage });
  } catch (error) {
    console.error('Reply to Message Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
