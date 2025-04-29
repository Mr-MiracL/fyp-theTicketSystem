import jwt from "jsonwebtoken";
import { createError } from "./error.js";
import User from "../models/users.js";  

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : req.cookies?.access_token;

  if (!token) {
    return next(createError(403, "Access denied: No token provided"));
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: "Access denied: Invalid token",
      });
    }

    try {
      const user = await User.findById(decoded.id);  
      if (!user) {
        return res.status(404).json({ message: "Unauthorized: user not found" });
      }
      req.user = user; 
      next();
    } catch (error) {
      console.error('Error in verifyToken:', error);
      return res.status(500).json({ message: 'Internal server error in token verification' });
    }
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
   
      if (req.user.role === "admin") {
        next();
      } else {
        return next(createError(403, "Access denied: Admins only"));
      }
    });
  };
  
  