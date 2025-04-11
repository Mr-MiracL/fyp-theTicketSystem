import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    description: { type: String, required: true },
    date: { type: Date, required: true },
    country: { type: String, required: true },
    ticketPrice: { type: Number, required: true },
    availableTickets: { type: Number, required: true }, 
    discount: { type: Number, default: 0 }, 
    image: { type: String }, 
    category: { 
        type: String, 
        required: true, 
        enum: ['Music', 'Sports', 'Theater', 'Conference','Others' ],
    },
    status: { 
        type: String, 
        enum: ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'], 
        default: 'Upcoming'
    },
    isPopular: { type: Boolean, default: false }, 
    
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
