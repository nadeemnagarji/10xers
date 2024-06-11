import { Router } from "express";
import { registerUser } from "../controllers/auth.controller.js";

const router = Router();

// router.route("/login").get(loginUser);
router.route("/register").get(registerUser);

export default router;
