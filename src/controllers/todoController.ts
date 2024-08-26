import { NextFunction, Request, Response } from "express";
import todoService from "../services/todoService";
import { userRequest } from "../types/types";

const createTodo = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description } = req.body;
    const todo = await todoService.createTodo(req.user.id, title, description);
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
};

const getTodos = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status, search } = req.query;
    const todos = await todoService.getTodos(
      req.user.id,
      String(status),
      String(search)
    );
    res.json(todos);
  } catch (error) {
    next(error);
  }
};

const getTodoById = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const todo = await todoService.getTodoById(req.params.id, req.user.id);
    res.json(todo);
  } catch (error) {
    next(error);
  }
};

const updateTodo = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, status } = req.body;
    const todo = await todoService.updateTodo(
      req.params.id,
      req.user.id,
      title,
      description,
      status
    );
    res.json(todo);
  } catch (error) {
    next(error);
  }
};

const deleteTodo = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    await todoService.deleteTodo(req.params.id, req.user.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export default {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
};
