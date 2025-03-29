import User1 from "../models/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";
import dotenv from "dotenv";
dotenv.config();

// register
export const register = async (req, res, next) => {
    try {
        const newUser = new User1({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password, //
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        next(err);
    }
};

// login
export const login = async (req, res, next) => {
    try {
        const user1 = await User1.findOne({ username: req.body.username });
        if (!user1) return next(createError(404, "User not found"));

        // confirmation
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user1.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ success: false, msg: "Wrong password" });
        }

        // create JWT token
        const token = jwt.sign(
            { id: user1._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        const { password, ...otherDetails } = user1.toObject();
        res.status(200).json({ success: true, token: "BEARER " + token, user: otherDetails });

    } catch (err) {
        next(err);
    }
};
