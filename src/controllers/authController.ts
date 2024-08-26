import { Request, Response, NextFunction } from "express";
import authService from "../services/authService";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, name } = req.body;
    const { user, token } = await authService.register(email, password, name);
    res.status(201).json({ user, token });
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.login(email, password);
    res.json({ user, token });
  } catch (error) {
    next(error);
  }
};

export default { register, login };
