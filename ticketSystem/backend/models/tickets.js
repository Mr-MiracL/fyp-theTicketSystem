import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true, // 必填项，表示属于哪个活动
    },
    price: {
      type: Number,
      required: true,
      min: 10,
      max: 500,
      validate: {
        validator: function (v) {
          if (this.ticketType === 'VIP' && v < 100) {
            return false;
          }
          return true;
        },
        message: props => `The price for a ${props.value} ticket is invalid for this type.`
      }
    },
    status: {
      type: String,
      enum: ["available", "sold", "cancelled"],
      default: "available"
    },
    area: {  
      type: String,
      required: true,
    },
    ticketType: {
      type: String,
      enum: ["Regular", "VIP"],
      required: true,
      default: "Regular"
    },
    availableTickets: { type: Number, required: true }, 
    validity: {
      type: Date,
      required: false,
      default: function () {
        const now = new Date();
        now.setDate(now.getDate() + 7); // 默认 7 天后失效
        return now;
      }
    },
    redeemed: {
      type: Boolean,
      default: false
    },
    specialRequests: {
      type: String,
      required: false,
      default: null
    },
    featured: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

export default mongoose.model("Ticket", ticketSchema);
