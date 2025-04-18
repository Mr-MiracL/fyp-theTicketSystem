import jwt from "jsonwebtoken";
import { createError } from "./error.js";


export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : req.cookies?.access_token;

  if (!token) {
    return next(createError(403, "Access denied: No token provided"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: "Access denied: Invalid token",
      });
    }

    req.user = user; 
    next();
  });
};



export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.role === "admin") {
      next();
    } else {
      return next(createError(403, "Access denied: User unauthorized"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
    //  console.log("Decoded token user info:", req.user); 
      if (req.user.role === "admin") {
        next();
      } else {
        return next(createError(403, "Access denied: Admins only"));
      }
    });
  };
  
  