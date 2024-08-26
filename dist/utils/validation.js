"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTodoInput = exports.validatePassword = exports.validateEmail = void 0;
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};
exports.validateEmail = validateEmail;
const validatePassword = (password) => {
    return password.length >= 8;
};
exports.validatePassword = validatePassword;
const validateTodoInput = (title, description) => {
    return title.trim().length > 0 && description.trim().length > 0;
};
exports.validateTodoInput = validateTodoInput;
