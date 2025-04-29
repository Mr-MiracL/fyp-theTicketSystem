import Comment from '../models/comments.js';
import Event from '../models/events.js';
import User from '../models/users.js'
export const getCommentsForEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

  
    const eventExists = await Event.exists({ _id: eventId });
    if (!eventExists) {
      return res.status(404).json({ message: 'Event not found' });
    }

  
    const comments = await Comment.find({ event: eventId })
      .populate('user', 'username email') 
      .sort({ createdAt: -1 }); 

    return res.status(200).json({
      message: 'Comments fetched successfully',
      data: comments, 
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};




export const addComment = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { content } = req.body;

    if (!content || content.trim() === '') {
      return res.status(400).json({ message: 'Comment content is required' });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Unauthorized: user not found' });
    }

    const eventExists = await Event.exists({ _id: eventId });
    if (!eventExists) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const newComment = new Comment({
      user: req.user._id,
      event: eventId,
      content,
    });

    const savedComment = await newComment.save();

    const populatedComment = await Comment.findById(savedComment._id)
      .populate("user", "username _id");

    return res.status(201).json({
      message: 'Comment added successfully',
      data: populatedComment,
    });

  } catch (error) {
    console.error('Error adding comment:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
