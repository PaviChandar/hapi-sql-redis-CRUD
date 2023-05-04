"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const accessToken = (userId, login) => {
    const token = jsonwebtoken_1.default.sign({
        id: userId,
        login: login
    }, "secret_token");
    return token;
};
exports.accessToken = accessToken;
