import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true }, // connection with other orders
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // cstomer
    amount: { type: Number, required: true }, // price
    status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" }, // statement
    paymentMethod: { type: String, required: true }, // way user choose to pay
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
