import mongoose from "mongoose";
const ticketSchema = new mongoose.Schema(
    {
      event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true }, // event
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // customer
      price: { 
        type: Number, 
        required: true, 
        min: 10, // set the lowest 
        max: 500, // set the highest
        validate: {
          validator: function(v) {
            // different identification for different tickets
            if (this.ticketType === 'VIP' && v < 100) {
              return false; // vip can't be lower than 100
            }
            return true;
          },
          message: props => `The price for a ${props.value} ticket is invalid for this type.`
        }
      }, // price with validation for min/max and special validation for ticketType
      status: { 
        type: String, 
        enum: ["available", "sold", "cancelled"], 
        default: "available" // ticket status
      },
      seatNumber: { type: String, required: false }, // optional seat number
      ticketType: { 
        type: String, 
        enum: ["Regular", "VIP"], 
        required: true, 
        default: "Regular" // ticket type, either Regular or VIP
      },
      validity: { 
        type: Date, 
        required: false, 
        default: function() {
          return this.event.date; // valid until the event date
        }
      },
      redeemed: { 
        type: Boolean, 
        default: false // track if the ticket has been redeemed
      },
      specialRequests: { 
        type: String, 
        required: false, 
        default: null // any special requests by the customer
      },
      featured: { 
        type: Boolean, 
        default: false // indicates if the ticket is a featured/recommended ticket
      },
    },
    { timestamps: true }
  );
  
  const Ticket = mongoose.model('Ticket', ticketSchema);
  
  
export default mongoose.model("Ticket", ticketSchema);
