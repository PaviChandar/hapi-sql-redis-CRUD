"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbServer = void 0;
const mssql_1 = __importDefault(require("mssql"));
const config_1 = __importDefault(require("./config/config"));
exports.dbServer = new mssql_1.default.ConnectionPool(config_1.default.get('db'))
    .connect()
    .then((res) => {
    console.log('DB is Connected');
    return res;
})
    .catch((err) => {
    console.log(err);
});
