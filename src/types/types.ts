import { Request } from "express";

interface userRequest extends Request {
  user?: any;
}

interface ApiError extends Error {
  statusCode?: number;
}

export { userRequest, ApiError };
