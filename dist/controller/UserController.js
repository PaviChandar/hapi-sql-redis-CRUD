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
                const hashpw = yield bcryptjs_1.default.hash(userpw, saltRounds);
                // .then(hash => {
                // console.log('Hash ', hash)
                // })
                // .catch(err => console.error(err.message))
                console.log("Hash pw in adduser : ", hashpw);
                const data = yield query.addUserQuery(user);
                console.log("data of user : ", data.recordset[0]);
                return res.response(data.recordset[0]);
            }
            catch (error) {
                console.log("Cannot add user : ", error);
                throw error;
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // try {
            const user = req.payload;
            const userpw = user.password;
            const saltRounds = 10;
            // const hashpw = bcrypt.hash(userpw, saltRounds)
            //                      .then(hash => {
            //                      console.log('Hash ', hash)
            //                     })
            //                      .catch(err => console.error(err.message))
            console.log("user pw : ", userpw);
            const loginData = yield query.loginUserQuery(user.email);
            const hashpass = JSON.stringify(loginData.recordset[0].passwordhash);
            console.log("hash : ", hashpass);
            const comparepw = yield bcryptjs_1.default.compare(userpw, hashpass);
            console.log("compared pw : ", comparepw);
            // if(loginData) {
            //     res.response({ message : LOGIN_FAILURE })
            //    const data= await bcrypt.compare(loginData.recordset[0].userpassword, hashpw)
            //    console.log(data)
            //     const access = accessToken(loginData.recordset[0].id)
            //     return res.response({ message: LOGIN_SUCCESS, data: loginData.recordset[0], access })
            // }
            // console.log(loginData.recordsets['userpassword'])
            // const passwordValidation = async() => {
            //     console.log("inside pw validation")
            //     const validatePassword = await bcrypt.compare(user.password, loginData.recordset[0].userpassword)
            //                                          .then(res => {
            //                                             console.log("response : ",res)
            //                                         })
            //                                          .catch(err => console.error("error msg : ",err.message))
            //     console.log(user.password)
            //     console.log('loginData',loginData.recordset[0].userpassword)
            //     console.log(validatePassword)
            // if(!validatePassword) {
            //     return res.response({ message : PASSWORD_INCORRECT})
            // }
        });
        // passwordValidation()
        // } catch(error) {
        //     console.log("Cannot login user : ", error)
        //     throw "Cannot login User"
        // }
    }
}
exports.default = UserController;
