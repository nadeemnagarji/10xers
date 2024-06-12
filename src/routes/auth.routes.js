import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/auth.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
router.route("/login").post(loginUser);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - role
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [CUSTOMER, ADMIN]
 *     responses:
 *       201:
 *         description: User registered successfully
 *       409:
 *         description: User  already exists
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
router.route("/register").post(registerUser);
router.route("/logout").post(verifyJwt, logoutUser);
export default router;
