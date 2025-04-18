import User from "../models/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res, next) => {
    try {
        console.log("Request Body:", req.body);

        const { username, email, password, role } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password, //
            role: role && ["user", "admin"].includes(role) ? role : "user"
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        const user1 = await User.findOne({ username: req.body.username });
        if (!user1) return next(createError(404, "User not found"));

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user1.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ success: false, msg: "Wrong password" });
        }

        const token = jwt.sign(
            { id: user1._id, role: user1.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        const { password, ...otherDetails } = user1.toObject();

        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json({
            success: true,
            token:  token,
            user: { _id: user1._id, ...otherDetails } // ✅ 手动加入 _id
        });

    } catch (err) {
        next(err);
    }
};
