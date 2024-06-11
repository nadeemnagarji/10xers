import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandleer } from "../utils/asyncHandler.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const verifyJwt = asyncHandleer(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    console.log(req.header("Authorization"));
    console.log("THIS IS TOKEN ", token);
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(decodedToken);
    const user = await prisma.user.findUnique({
      where: { id: decodedToken._id },
    });

    console.log(user);

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, "Unauthorized request");
  }
});
