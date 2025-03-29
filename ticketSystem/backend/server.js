import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./router/authRoute.js"; 
import eventRoutes from "./router/eventRoute.js";
//import orderRoutes from "./router/orderRoute.js";
//import paymentRoutes from "./router/paymentRoute.js";
//import ticketRoutes from "./router/ticketRoute.js";



dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true })); // 解析 URL-encoded 数据
app.use("/api/auth", authRoutes);  
//app.use("/api/tickets", ticketRoutes);
//app.use("/api/orders", orderRoutes);
//app.use("/api/payment", paymentRoutes);
app.use("/api/events", eventRoutes);
app.use((err,req,res,next)=>{
  const errorStatus=err.status || 500
  const errorMessage =err.message || "something went wrong!"
  return res.status(500).json(errorMessage).json({
    success: false,
    status:errorStatus,
    message:errorMessage,
    stack:err.stack,
  })

})

const PORT = 5000;


mongoose.connect('mongodb://localhost:27017/ticketing-system', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log(err));


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
