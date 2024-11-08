import express from "express";
import { LOGIN, REGISTER } from "../controller/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/courses/register", REGISTER);
router.post("/courses/login", LOGIN);

export default router;
