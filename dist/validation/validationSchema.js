"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = exports.employeeValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const employeeValidationSchema = (input) => {
    const employeeSchema = joi_1.default.object({
        id: joi_1.default.number()
            .required(),
        name: joi_1.default.string()
            .min(5)
            .required(),
        age: joi_1.default.number()
            .precision(2)
            .required(),
        city: joi_1.default.string()
            .required(),
        salary: joi_1.default.number()
            .required(),
        login: joi_1.default.boolean()
    });
    return employeeSchema.validate(input);
};
exports.employeeValidationSchema = employeeValidationSchema;
const userValidationSchema = (input) => {
    const userSchema = joi_1.default.object({
        username: joi_1.default.string()
            .min(5)
            .required(),
        email: joi_1.default.string()
            .min(5)
            .required(),
        password: joi_1.default.string()
            .min(5)
            .required(),
        confirmpassword: joi_1.default.string()
            .min(5)
            .required()
    });
    return userSchema.validate(input);
};
exports.userValidationSchema = userValidationSchema;
