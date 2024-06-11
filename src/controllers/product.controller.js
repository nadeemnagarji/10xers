import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandleer } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { application } from "express";
const prisma = new PrismaClient();

export const getAllProducts = asyncHandleer(async (req, res) => {
  const allproducts = await prisma.product.findMany();
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

export const updateProducts = asyncHandleer(async (req, res) => {
  const { name, price, description } = req.body;
  const { id } = req.params;
  console.log(id);
  const product = await prisma.product.update({
    where: { id: parseInt(id) },
    data: {
      ...req.body,
    },
  });

  if (!product) {
    new ApiError(500, "error while updating the products");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, product, "product updated successfully"));
});

export const deleteProducts = asyncHandleer(async (req, res) => {
  const { id } = req.params;

  const product = await prisma.product.delete({
    where: { id: parseInt(id) },
  });

  if (!product) {
    new ApiError(500, "error while deleting the product");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, product, "product deleted successfully"));
});

export const filteredProducts = asyncHandleer(async (req, res) => {
  const { adminId } = req.params;
  const products = await prisma.product.findMany({
    where: { createdBy: parseInt(adminId) },
  });
  console.log(products);
  if (!products) {
    throw new application(500, "error while fetching products from database");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, products, "products fetched successfully"));
});
