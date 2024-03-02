import express from 'express';
import {updateUser, userResponse} from "../controllers/user.controller.js";
import {verifyToken} from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", userResponse);
router.post("/update/:id", verifyToken, updateUser);

export default router;