import jwt from "jsonwebtoken";
import { createError } from "./error.js";


export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token; // 

    if (!token) {
        return next(createError(403,"Access denied without authorized"))
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ success: false, message: "Invalid token" });

        req.user = user;
        next();
    });
};

export const verifyUser= (req, res, next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.id===req.params,id || req.user.role==="admin"){
            next()
        }else{
           return next(createError(403,"Access denied without authorized"))
        }
 } )
}
export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.role === "admin") {
            next();
        } else {
            return next(createError(403, "Access denied, admin only"));
        }
    });
};