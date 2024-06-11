import { Router } from "express";
import { verifyJwt, verifyAdmin } from "../middlewares/auth.middleware.js";
import {
  createProducts,
  getAllProducts,
  deleteProducts,
  updateProducts,
  filteredProducts,
} from "../controllers/product.controller.js";

const router = Router();

//Public routes (PUBLIC ACCESS)
router.route("/all").get(getAllProducts);

//only admin access (ADMIN ONLY)
router.route("/create").post(verifyJwt, verifyAdmin, createProducts);
router.route("/update/:id").put(verifyJwt, verifyAdmin, updateProducts);
router.route("/delete/:id").delete(verifyJwt, verifyAdmin, deleteProducts);

//filter products by adminName (ADMIN ONLY)

router.route("/admin/:adminId").get(verifyJwt, verifyAdmin, filteredProducts);

export default router;
