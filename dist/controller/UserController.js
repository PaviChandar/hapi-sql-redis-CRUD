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
                return res.response(data.recordset[0]);
            }
            catch (error) {
                console.log("Cannot add user : ", error);
                throw error;
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.payload;
                console.log("user email : ", user.email);
                const userEmail = user.email;
                const userPassword = user.password;
                const loginData = yield query.loginUserQuery(userEmail);
                console.log("Logindata : ", loginData);
                if (!loginData.recordset) {
                    console.log("inside if");
                    console.log("Login failed for user");
                    return res.response({ message: constants_1.LOGIN_FAILURE });
                }
                console.log("Payload pw : ", userPassword);
                console.log("db pw : ", loginData.recordset[0].userpassword);
                const validatePassword = yield bcryptjs_1.default.compare(userPassword, loginData.recordset[0].userpassword);
                console.log("match : ", validatePassword);
                if (!validatePassword) {
                    return res.response({ message: constants_1.PASSWORD_INCORRECT });
                }
                const tokenwithid = (0, token_1.accessToken)(loginData.recordset[0].id);
                return res.response({ message: constants_1.LOGIN_SUCCESS, data: loginData.recordset[0], tokenwithid });
            }
            catch (error) {
                console.log("Cannot login employee");
                throw error;
            }
        });
    }
}
exports.default = UserController;
