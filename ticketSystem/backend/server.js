import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./router/authRoute.js"; 
import eventRouter from "./router/eventRoute.js";
import userRouter from "./router/userRoute.js";
//import orderRoutes from "./router/orderRoute.js";
//import paymentRoutes from "./router/paymentRoute.js";
//import ticketRoutes from "./router/ticketRoute.js";
import cookieParser from "cookie-parser";
const app = express();
dotenv.config();

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



app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true })); // 解析 URL-encoded 数据
app.use("/api/auth", authRouter);  
//app.use("/api/tickets", ticketRoutes);
//app.use("/api/orders", orderRoutes);
//app.use("/api/payment", paymentRoutes);
app.use("/api/events", eventRouter);
app.use("/api/users",userRouter)
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
