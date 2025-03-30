import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    description: { type: String, required: true },
    date: { type: Date, required: true },
    country: { type: String, required: true },
    ticketPrice: { type: Number, required: true },
    availableTickets: { type: Number, required: true }, // 新增：剩余票数
    discount: { type: Number, default: 0 }, // 新增：折扣
    image: { type: String }, // 新增：活动图片 URL
    category: { 
        type: String, 
        required: true, 
        enum: ['Music', 'Sports', 'Theater', 'Conference', 'Workshop', 'Festival'],
    },
    status: { 
        type: String, 
        enum: ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'], 
        default: 'Upcoming'
    },
    isPopular: { type: Boolean, default: false }, // 新增：是否为热门活动
    
    eventType: { type: String, enum: ['Online', 'Offline'], default: 'Offline' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

eventSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
