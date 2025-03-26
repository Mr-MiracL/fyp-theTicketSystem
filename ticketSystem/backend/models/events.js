import mongoose from "mongoose";
const eventSchema = new mongoose.Schema({
    name: { type: String, required: true }, // title
    description: { type: String, required: true }, // description
    date: { type: Date, required: true }, // time
    location: { type: String, required: true }, // place (venue name)
    ticketPrice: { type: Number, required: true }, // price
    category: { 
        type: String, 
        required: true, 
        enum: ['Music', 'Sports', 'Theater', 'Conference', 'Workshop', 'Festival'], // define categories
    },
    status: { 
        type: String, 
        enum: ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'], 
        default: 'Upcoming' // Default to "Upcoming" event
    },
    organizer: { 
        type: String, 
        required: true, // name of the organizer 
    },
    eventType: { 
        type: String, 
        enum: ['Online', 'Offline'], 
        default: 'Offline' // default to offline events
    },
    createdAt: { 
        type: Date, 
        default: Date.now, // event creation timestamp 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now, // event last update timestamp
    },
});

eventSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Event = mongoose.model('Event', eventSchema);

export default mongoose.model("Event", eventSchema);
