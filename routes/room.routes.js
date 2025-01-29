import { Router } from "express";
import { authUser } from '../middleware/auth.middleware.js';
import { getAllMessages, sendMessage } from "../controllers/room.controller.js";

const router=Router();

router.get('/all-messages/:projectId',authUser,getAllMessages);
router.post('/send/:projectId',authUser,sendMessage);

export default router;