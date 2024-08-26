"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoController_1 = __importDefault(require("../controllers/todoController"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.use(auth_1.default);
router.post("/", todoController_1.default.createTodo);
router.get("/", todoController_1.default.getTodos);
router.get("/:id", todoController_1.default.getTodoById);
router.put("/:id", todoController_1.default.updateTodo);
router.delete("/:id", todoController_1.default.deleteTodo);
exports.default = router;
