import express from 'express';
import {userResponse} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/test", userResponse);

export default router;