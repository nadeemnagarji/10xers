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

/**
 * @swagger
 * /products/all:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products
 *       500:
 *         description: Internal server error
 */

router.route("/all").get(getAllProducts);

//only admin access (ADMIN ONLY)

/**
 * @swagger
 * /products/create:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.route("/create").post(verifyJwt, verifyAdmin, createProducts);
/**
 * @swagger
 * /products/update/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.route("/update/:id").put(verifyJwt, verifyAdmin, updateProducts);
/**
 * @swagger
 * /products/delete/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.route("/delete/:id").delete(verifyJwt, verifyAdmin, deleteProducts);

//filter products by adminName (ADMIN ONLY)
/**
 * @swagger
 * /products/admin/{adminId}:
 *   get:
 *     summary: Get products by admin
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: adminId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Admin ID
 *     responses:
 *       200:
 *         description: List of products created by the admin
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

router.route("/admin/:adminId").get(verifyJwt, verifyAdmin, filteredProducts);

export default router;
