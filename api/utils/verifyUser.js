import {errorHandler} from './error.js';
import * as Process from "process";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if(!token) return next(errorHandler(401, "Unauthorised Access !"));

    jwt.verify(token, Process.env.JWT_SECRET, (error, user) => {
        if(error) return next(errorHandler(403, 'Forbidden'));

        req.user = user;
        next();
    })
}