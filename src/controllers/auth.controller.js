import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandleer } from "../utils/asyncHandler.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const registerUser = asyncHandleer(async (req, res) => {
  const { email, password, role } = req.body;

  if ([email, password, role].some((item) => item?.trim() === "")) {
    throw new ApiError(400, "all fields are required");
  }
});
