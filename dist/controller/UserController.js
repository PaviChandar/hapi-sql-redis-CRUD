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
const validationSchema_1 = require("../validation/validationSchema");
const userQuery_1 = require("../repositories/userQuery");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
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
                    return errors;
                }
                const user = req.payload;
                const userpw = user.password;
                const saltRounds = 10;
                const hashedpassword = yield bcryptjs_1.default.hash(userpw, saltRounds);
                const data = yield query.addUserQuery(user, hashedpassword);
                return res.response(data.recordset[0]).code(httpCode_1.SUCCESS);
            }
            catch (error) {
                console.log("Cannot add user : ", error);
                return res.response({ message: "Cannot add user " }).code(httpCode_1.BAD_REQUEST);
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.payload;
                const userEmail = user.email;
                const userPassword = user.password;
                const loginData = yield query.loginUserQuery(userEmail);
                if (!loginData.recordset) {
                    return res.response({ message: constants_1.LOGIN_FAILURE });
                }
                const validatePassword = yield bcryptjs_1.default.compare(userPassword, loginData.recordset[0].userpassword);
                if (!validatePassword) {
                    return res.response({ message: constants_1.PASSWORD_INCORRECT });
                }
                const token = (0, token_1.accessToken)(loginData.recordset[0].id);
                return res.response({ message: constants_1.LOGIN_SUCCESS, data: loginData.recordset[0], token });
            }
            catch (error) {
                console.log("Cannot login employee");
                return res.response({ message: "Cannot login user " }).code(httpCode_1.BAD_REQUEST);
            }
        });
    }
}
exports.default = UserController;
