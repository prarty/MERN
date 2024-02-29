import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import {errorHandler} from "../utils/error.js";

export const signup = async (req, res, next) => {
    const {username, email, password} = req.body
    const hashedPassword = bcryptjs.hashSync(password, 10)  //encrypt password and give salt as 10
    const user = new User({username, email, password: hashedPassword});
    try {
        await user.save();
        res.status(201).json("User Created Successfully");
    }catch (error) {
        next(error)
       // next(errorHandler(520, "Custom error msg"));
    }
}