import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser";


dotenv.config();

const app = express();
app.use(express.json()) //to allow json input to system
app.use(cookieParser())
mongoose.connect(process.env.MONGO_CONNECTION).then(() => {
    console.log("Connected to MongoDB")
}).catch((err) => {
    console.log(err)
})


app.listen(3000, () => {
    console.log("Server running on 3000 port !!")
})

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

//create below middleware to handle exceptions
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const errorMessage = err.message || "Internal Server Error";

    return res.status(statusCode).json({
        statusCode,
        errorMessage,
        success: false
    });
});
