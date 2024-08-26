"use strict";
// const bcrypt = require("bcryptjs");
// const prisma = require("../config/database");
// const { generateToken } = require("../utils/jwtUtils");
// const { validateEmail, validatePassword } = require("../utils/validation");
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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwtUtils_1 = require("../utils/jwtUtils");
const validation_1 = require("../utils/validation");
const register = (email, password, name) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, validation_1.validateEmail)(email) || !(0, validation_1.validatePassword)(password)) {
        throw new Error("Invalid email or password");
    }
    const existingUser = yield database_1.default.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new Error("Email already in use");
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const user = yield database_1.default.user.create({
        data: { email, password: hashedPassword, name },
    });
    const token = (0, jwtUtils_1.generateToken)(user.id);
    return { user, token };
});
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield database_1.default.user.findUnique({ where: { email } });
    if (!user) {
        throw new Error("Invalid email or password");
    }
    const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }
    const token = (0, jwtUtils_1.generateToken)(user.id);
    return { user, token };
});
exports.default = { login, register };
