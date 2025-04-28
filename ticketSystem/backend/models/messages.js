import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    reply: {
      type: String,
      default: '',
    },
  }, { timestamps: true });
  
const Message = mongoose.model('Message', messageSchema);

export default Message;
