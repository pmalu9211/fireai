"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../config/database"));
const validation_1 = require("../utils/validation");
const createTodo = (userId, title, description) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, validation_1.validateTodoInput)(title, description)) {
        throw new Error("Invalid todo input");
    }
    return database_1.default.todo.create({
        data: { title, description, userId },
    });
});
const getTodos = (userId, status, search) => __awaiter(void 0, void 0, void 0, function* () {
    const where = { userId }; // Initialize 'where' with 'userId'
    if (status !== undefined) {
        where.status = status === "true";
    }
    if (search) {
        where.OR = [
            { title: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
        ];
    }
    return database_1.default.todo.findMany({ where });
});
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
const getTodoById = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = yield database_1.default.todo.findUnique({
        where: { id: parseInt(id) },
    });
    if (!todo || todo.userId !== userId) {
        throw new Error("Todo not found");
    }
    return todo;
});
const updateTodo = (id, userId, title, description, status) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = yield getTodoById(id, userId);
    const updatedTitle = title || todo.title;
    const updatedDescription = description || todo.description;
    const updatedStatus = status === undefined ? todo.status : status;
    return database_1.default.todo.update({
        where: { id: parseInt(id) },
        data: {
            title: updatedTitle,
            description: updatedDescription,
            status: updatedStatus,
        },
    });
});
const deleteTodo = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = yield getTodoById(id, userId);
    return database_1.default.todo.delete({
        where: { id: parseInt(id) },
    });
});
exports.default = {
    createTodo,
    getTodos,
    getTodoById,
    updateTodo,
    deleteTodo,
};
