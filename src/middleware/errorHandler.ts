import { NextFunction, Request, Response } from "express";
import { ApiError } from "../types/types";

const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response
  // next: NextFunction
) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    error: {
      message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    },
  });
};

export default errorHandler;
