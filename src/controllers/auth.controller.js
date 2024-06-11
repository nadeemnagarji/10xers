import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandleer } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export const registerUser = asyncHandleer(async (req, res) => {
  const { email, password, role } = req.body;

  if ([email, password, role].some((item) => item?.trim() === "")) {
    throw new ApiError(400, "all fields are required");
  }
  console.log(email);
  const existedUser = await prisma.user.findUnique({ where: { email } });

  if (existedUser) {
    throw new ApiError(409, "user already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  // console.log(hashedPassword);

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role,
    },
    select: {
      id: true,
      email: true,
      role: true,
    },
  });

  if (!newUser) {
    throw new ApiError(500, "Something went wrong while creating user in DB");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    newUser
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, newUser, "user created succesfully"));
});

export const loginUser = asyncHandleer(async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].some((item) => item.trim() === "")) {
    throw new ApiError(400, "all fields are required");
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new ApiError(400, "invalid email id");
  }

  const passwordCheck = await isPasswordCorrect(password, user.password);

  if (!passwordCheck) {
    throw new ApiError(400, "Please enter correct password");
  }

  const { accessToken, refreshToken } = generateAccessAndRefreshToken(user);

  const options = {
    httpOnly: true,
    secure: true,
  };

  const loggedInUser = await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, role: true },
  });

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, loggedInUser, "user logged in succesfully"));
});

const isPasswordCorrect = async (userPassword, DBpassword) => {
  return await bcrypt.compare(userPassword, DBpassword);
};

export function generateAccessToken(user) {
  return jwt.sign(
    {
      _id: user.id,
      email: user.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
}

export function generateRefreshToken(user) {
  return jwt.sign(
    {
      _id: user.id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
}

const generateAccessAndRefreshToken = async (user) => {
  try {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await prisma.user.update({
      where: { id: user.id },
      data: {
        refreshToken: refreshToken,
      },
    });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};
