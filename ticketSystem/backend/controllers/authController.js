import users from "../models/users.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();


// registration
export const register = async (req, res, next) => {
    try {
     
        // registration
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync( salt);



        const newUser = new users({
            username: req.body.username,
            email: req.body.email,
            password: hash, // store hashed password
        });

        await newUser.save();
        res.status(200).json({ message: "User has been created successfully" });
    } catch (err) {
        next(err);
    }
};

// login
export const login = async (req, res, next) => {
    try {
        const user1 = await users.findOne({ username: req.body.username });
        if (!user1) return next(createError(404, "User not found"));

        // password confimation
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user1.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ success: false, msg: "Wrong password" },

            );
            
        }

        // create a token
        const token = jwt.sign(
            { id: user1._id},
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // filter password
        const { password, ...otherDetails } = user1.toObject();
        res.status(200).json({ success: true, token: "BEARER " + token, user: otherDetails });

    } catch (err) {
        next(err);
    }
};