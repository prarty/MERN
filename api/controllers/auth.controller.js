import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
    const {username, email, password} = req.body
    const hashedPassword = bcryptjs.hashSync(password, 10)  //encrypt password and give salt as 10
    const user = new User({username, email, password: hashedPassword});
    try {
        await user.save();
        res.status(201).send("User Created Successfully");
    }catch (error) {
        res.status(500).json(error.message)
    }

}