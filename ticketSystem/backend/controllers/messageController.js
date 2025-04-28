import Message from '../models/messages.js';
import jwt from 'jsonwebtoken';


export const sendMessage = async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
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
        user: userId, // ✅ 正确字段名
        message,
      });
  
      await newMessage.save();
      res.status(201).json({ message: 'Message sent successfully', data: newMessage });
    } catch (error) {
      console.error('Send Message Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
export const getUserMessages = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const messages = await Message.find({ userId }).populate('userId');
    
    if (!messages.length) {
      return res.status(404).json({ message: 'No messages found' });
    }

    res.status(200).json(messages);
  } catch (err) {
    next(err); // 将错误传递给全局错误处理中间件
  }
};

export const getAllMessagesForAdmin = async (req, res, next) => {
  try {
    const messages = await Message.find().populate('userId');
    
    if (!messages.length) {
      return res.status(404).json({ message: 'No messages found' });
    }

    res.status(200).json(messages);
  } catch (err) {
    next(err); 
  }
};

export const replyToMessage = async (req, res, next) => {
  try {
    const { response } = req.body;
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    message.response = response;
    message.status = 'responded';
    await message.save();

    res.status(200).json({ message: 'Response sent successfully' });
  } catch (err) {
    next(err); // 将错误传递给全局错误处理中间件
  }
};
