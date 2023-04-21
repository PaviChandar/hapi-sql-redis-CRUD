"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// const createToken = async(userdata:any) => {
//     const token = jwt.sign(
//         {
//             name: userdata.username,
//             email: userdata.email
//         },
//         "secrettoken"
//     )
//     return token
// }
// export default createToken
const accessToken = (userId) => {
    const token = jsonwebtoken_1.default.sign({
        id: userId
    }, "secret_token");
    return token;
};
exports.accessToken = accessToken;