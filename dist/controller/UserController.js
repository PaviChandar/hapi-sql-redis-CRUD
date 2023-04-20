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
const mssql_1 = __importDefault(require("mssql"));
const validationSchema_1 = require("../validation/validationSchema");
const token_1 = __importDefault(require("../utils/token"));
const config_1 = __importDefault(require("../config/config"));
class UserController {
    constructor() {
        this.addUser = (request) => __awaiter(this, void 0, void 0, function* () {
            try {
                const validation = (0, validationSchema_1.userValidationSchema)(request.payload);
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
                const user = request.payload;
                const result = yield this.poolconnection();
                const newUser = yield result
                    .input('iUsername', mssql_1.default.NVarChar, user.username)
                    .input('iEmail', mssql_1.default.NVarChar, user.email)
                    .input('iPassword', mssql_1.default.NVarChar, user.password)
                    .execute('insertUser');
                return newUser.recordsets;
            }
            catch (error) {
                console.log("Cannot add user : ", error);
                throw error;
            }
        });
        this.login = (request) => __awaiter(this, void 0, void 0, function* () {
            try {
                const loginValue = request.payload;
                const result = yield this.poolconnection();
                const loginUser = yield result
                    .input('lemail', mssql_1.default.NVarChar, loginValue.email)
                    .execute('loginUser');
                (0, token_1.default)(loginValue);
                return loginUser.recordsets;
            }
            catch (error) {
                throw error;
            }
        });
    }
    poolconnection() {
        return __awaiter(this, void 0, void 0, function* () {
            // const pool =  await new sqlInstance.ConnectionPool(config).connect()
            const pool = yield mssql_1.default.connect(config_1.default);
            const result = yield pool.request();
            return result;
        });
    }
}
exports.default = UserController;
