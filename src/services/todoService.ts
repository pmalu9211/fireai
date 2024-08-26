import prisma from "../config/database";
import { validateTodoInput } from "../utils/validation";

const createTodo = async (
  userId: number,
  title: string,
  description: string
) => {
  if (!validateTodoInput(title, description)) {
    throw new Error("Invalid todo input");
  }

  return prisma.todo.create({
    data: { title, description, userId },
  });
};

const getTodos = async (userId: number, status?: string, search?: string) => {
  const where: any = { userId }; // Initialize 'where' with 'userId'

  if (status !== undefined) {
    where.status = status === "true";
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  return prisma.todo.findMany({ where });
};
/*
prisma.todo.findMany({
  where: {
    userId: 1,
    status: true,
    OR: [
      { title: { contains: "search string", mode: "insensitive" } },
      { description: { contains: "search string", mode: "insensitive" } },
    ]
  },
  orderBy: { createdAt: "desc" },
  take: 10,
  skip: 5
});

*/

const getTodoById = async (id: string, userId: number) => {
  const todo = await prisma.todo.findUnique({
    where: { id: parseInt(id) },
  });

  if (!todo || todo.userId !== userId) {
    throw new Error("Todo not found");
  }

  return todo;
};

const updateTodo = async (
  id: string,
  userId: number,
  title: string,
  description: string,
  status: boolean
) => {
  const todo = await getTodoById(id, userId);

  const updatedTitle = title || todo.title;
  const updatedDescription = description || todo.description;
  const updatedStatus = status === undefined ? todo.status : status;

  return prisma.todo.update({
    where: { id: parseInt(id) },
    data: {
      title: updatedTitle,
      description: updatedDescription,
      status: updatedStatus,
    },
  });
};

const deleteTodo = async (id: string, userId: number) => {
  const todo = await getTodoById(id, userId);

  return prisma.todo.delete({
    where: { id: parseInt(id) },
  });
};

export default {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
};
