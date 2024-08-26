import express from "express";
import todoController from "../controllers/todoController";
import authenticate from "../middleware/auth";

const router = express.Router();

router.use(authenticate);

router.post("/", todoController.createTodo);
router.get("/", todoController.getTodos);
router.get("/:id", todoController.getTodoById);
router.put("/:id", todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);

export default router;
