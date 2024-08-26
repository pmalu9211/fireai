// const bcrypt = require("bcryptjs");
// const prisma = require("../config/database");
// const { generateToken } = require("../utils/jwtUtils");
// const { validateEmail, validatePassword } = require("../utils/validation");

import prisma from "../config/database";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwtUtils";
import { validateEmail, validatePassword } from "../utils/validation";

const register = async (email: string, password: string, name: string) => {
  if (!validateEmail(email) || !validatePassword(password)) {
    throw new Error("Invalid email or password");
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error("Email already in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashedPassword, name },
  });

  const token = generateToken(user.id);
  return { user, token };
};

const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user.id);
  return { user, token };
};

export default { login, register };
