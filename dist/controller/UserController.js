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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const validationSchema_1 = require("../validation/validationSchema");
const userQuery_1 = require("../repositories/userQuery");
const token_1 = require("../utils/token");
const constants_1 = require("../constants/constants");
const httpCode_1 = require("../constants/httpCode");
const query = new userQuery_1.UserQuery;
class UserController {
    constructor() {
        this.addUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const validation = (0, validationSchema_1.userValidationSchema)(req.payload);
                if (validation.error) {
                    const errors = [];
                    validation.error.details.forEach((detail) => {
                        let error = {
                            [detail.path.toString()]: detail.message
                        };
                        errors.push(error);
                    });
                    throw errors;
                }
                const user = req.payload;
                const userpw = user.password;
                const saltRounds = 10;
                const hashedpassword = yield bcryptjs_1.default.hash(userpw, saltRounds);
                const data = yield query.addUserQuery(user, hashedpassword);
                return res.response({ message: constants_1.REGISTER_SUCCESS, data: data.recordset[0] }).code(httpCode_1.SUCCESS);
            }
            catch (error) {
                console.log("Cannot add user : ", error);
                return res.response({ message: error }).code(httpCode_1.BAD_REQUEST);
            }
        });
        this.loginUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.payload;
                const userEmail = user.email;
                const userPassword = user.password;
                const loginData = yield query.loginUserQuery(userEmail);
                if (!loginData.recordset) {
                    throw constants_1.LOGIN_FAILURE;
                }
                const validatePassword = yield bcryptjs_1.default.compare(userPassword, loginData.recordset[0].userpassword);
                if (!validatePassword) {
                    throw constants_1.PASSWORD_INCORRECT;
                }
                const token = (0, token_1.accessToken)(loginData.recordset[0].id, loginData.recordset[0].login, loginData.recordset[0].username);
                return res.response({ message: constants_1.LOGIN_SUCCESS, data: loginData.recordset[0], token });
            }
            catch (error) {
                console.log("Cannot login employee", error);
                return res.response({ message: error }).code(httpCode_1.BAD_REQUEST);
            }
        });
        this.editUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const validation = (0, validationSchema_1.userValidationSchema)(req.payload);
                if (validation.error) {
                    const errors = [];
                    validation.error.details.forEach((detail) => {
                        let error = {
                            [detail.path.toString()]: detail.message
                        };
                        errors.push(error);
                    });
                    throw errors;
                }
                const usid = req.params.id;
                const user = req.payload;
                const data = yield query.updateUserQuery(usid, user);
                return res.response({ message: "User updated successfully", data: data.recordset[0] }).code(httpCode_1.SUCCESS);
            }
            catch (error) {
                console.log("Cannot update user : ", error);
                return res.response({ message: error }).code(httpCode_1.BAD_REQUEST);
            }
        });
        this.viewUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const vid = req.params.id;
                console.log("id : ", vid);
                const data = yield query.viewUserQuery(vid);
                console.log("data : ", data.recordset);
                return res.response({ message: "User retreived successfully", data: data.recordset }).code(httpCode_1.SUCCESS);
            }
            catch (error) {
                return res.response({ message: "Cannot get user " }).code(httpCode_1.BAD_REQUEST);
            }
        });
    }
}
exports.default = UserController;
