import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import catchAsync from "@/utils/catchAsync.js";
import ApiError from "@/utils/apiError.js";
import User from "../models/user.model.js";

const auth = catchAsync(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  };

  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Access denied. No token provided");
  };

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.userId);

    if (!user || user.isActive === false) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Access denied. User not found");
    };

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid token");
  }
});

export {auth};