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
const todoService_1 = __importDefault(require("../services/todoService"));
const createTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const todo = yield todoService_1.default.createTodo(req.user.id, title, description);
        res.status(201).json(todo);
    }
    catch (error) {
        next(error);
    }
});
const getTodos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, search } = req.query;
        const todos = yield todoService_1.default.getTodos(req.user.id, String(status), String(search));
        res.json(todos);
    }
    catch (error) {
        next(error);
    }
});
const getTodoById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = yield todoService_1.default.getTodoById(req.params.id, req.user.id);
        res.json(todo);
    }
    catch (error) {
        next(error);
    }
});
const updateTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, status } = req.body;
        const todo = yield todoService_1.default.updateTodo(req.params.id, req.user.id, title, description, status);
        res.json(todo);
    }
    catch (error) {
        next(error);
    }
});
const deleteTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield todoService_1.default.deleteTodo(req.params.id, req.user.id);
        res.status(204).end();
    }
    catch (error) {
        next(error);
    }
});
exports.default = {
    createTodo,
    getTodos,
    getTodoById,
    updateTodo,
    deleteTodo,
};
