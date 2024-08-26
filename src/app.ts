import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import todoRoutes from "./routes/todoRoutes";
import errorHandler from "./middleware/errorHandler";
import rateLimiter from "./middleware/rateLimiter";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

app.use(errorHandler);

export default app;
