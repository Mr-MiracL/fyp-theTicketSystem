import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // customer
    tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ticket", required: true }], // connection with other orders
    totalPrice: { type: Number, required: true }, // total price
    paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" }, // payment statement
    orderStatus: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" }, // order statement
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
