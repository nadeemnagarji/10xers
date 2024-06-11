import { Router } from "express";
import { verifyJwt, verifyAdmin } from "../middlewares/auth.middleware.js";
import {
  createProducts,
  getAllProducts,
} from "../controllers/product.controller.js";

const router = Router();

//Public routes (PUBLIC ACCESS)
router.route("/all").get(getAllProducts);

//only admin access (ADMIN ONLY)
router.route("/create").post(verifyJwt, verifyAdmin, createProducts);
router.route("/:id").put(verifyJwt, verifyAdmin);
router.route("/:id").delete(verifyJwt, verifyAdmin);

export default router;
