import { Router } from "express";
import { createMessage } from "../controllers/message.controller";

const router = Router();

router.post("/", createMessage);

export default router;