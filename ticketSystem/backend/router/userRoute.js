import express from "express";
import { updateUser,deleteUser,getUser,getAllUsers } from "../controllers/userController.js";
import { verifyToken, verifyUser, verifyAdmin} from "../utils/verifyToken.js";



const userRouter=express.Router();

userRouter.get("/checkAuthentication", verifyToken,(req, res, next)=>{
    res.json({ success: true, message: "You have access!", user: req.user });
}
)

userRouter.get("/checkUser/:id", verifyUser,(req, res, next)=>{
    res.json({ success: true, message: "you have logged in and you can delete account" });
}
)
userRouter.get("/checkadmin/:id", verifyAdmin,(req, res, next)=>{
    res.json({ success: true, message: "you have logged in and you can delete account" });
}

)
//userRouter.get("/users",verifyUser, getAllUsers);
userRouter.put("/:id",verifyUser, updateUser)
userRouter.delete("/:id",verifyUser, deleteUser)
userRouter.get("/:id",verifyUser, getUser)

userRouter.get("/",verifyAdmin,getAllUsers)

export default userRouter;