import {errorHandler} from '../utils/error.js'
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
export const userResponse = (req, res) => {
    res.send("HEllo India!!!")
}

export const updateUser = async (req, res, next) => {
    if(req.params.id !== req.user.id) return next(errorHandler(401, "You cna only update your account details"));

    try {
        if(req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }
        let updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                avatar: req.body.avatar
            }
        }, {new: true});

        const {password, ...rest} = updatedUser._doc;
        return res.status(200).json(rest);
    }catch (error) {
        next(error)
    }
}

export const deleteUser = async (req, res, next) => {
    if(req.params.id !== req.user.id) return next(errorHandler(401, "You can only delete your account"))
    try{
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json("Account Deleted Successfully");
    }catch(error) {
        next(error)
    }
}