import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import {errorHandler} from "../utils/error.js";
import jwt from "jsonwebtoken";

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

export const signin = async (req, res, next) => {
    const { email, password} = req.body;
    try {
        let validUser = await User.findOne({email});
        if(!validUser) return next(errorHandler(404, "User not found"));
        let isValidPassword = bcryptjs.compareSync(password, validUser.password);
        if(!isValidPassword) return next(errorHandler(401, "Invalid Credentials!!"))
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET )
        const {password:pass, ...rest} = validUser._doc
        res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest)

    } catch (e) {
        next(e)
    }
}