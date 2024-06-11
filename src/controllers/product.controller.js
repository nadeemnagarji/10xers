import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandleer } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export const getAllProducts = asyncHandleer((req, res) => {
  const allproducts = prisma.product.findMany();
  if (!allproducts) {
    new ApiError(500, "error while fetching the products");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, allproducts, "all products sent"));
});

export const createProducts = asyncHandleer(async (req, res) => {
  const { name, price, description } = req.body;
  const id = req.user.id;

  const product = await prisma.product.create({
    data: {
      name,
      price,
      description,
      createdBy: id,
    },
  });

  if (!product) {
    new ApiError(500, "error while creating the products");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, product, "product created successfully"));
});
