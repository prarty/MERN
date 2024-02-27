import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from "./routes/user.route.js";

dotenv.config();

const app = express();
mongoose.connect(process.env.MONGO_CONNECTION).then(() => {
    console.log("Connected to MongoDB")
}).catch((err) => {
    console.log(err)
})


app.listen(3000, () => {
    console.log("Server running on 3000 port !!")
})

app.use("/api/users", userRoute);


