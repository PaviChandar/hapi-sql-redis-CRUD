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
exports.init = void 0;
const hapi_1 = require("@hapi/hapi");
const mssql_1 = __importDefault(require("mssql"));
const dbConfig = {
    user: 'sa',
    password: 'aspire@123',
    server: 'localhost',
    database: 'focaldb',
    options: {
        trustServerCertificate: true
    }
};
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    const server = new hapi_1.Server({
        port: 4000,
        host: "localhost",
    });
    server.route({
        method: 'GET',
        path: '/',
        handler: function (req, h) {
            return "Hi server connection";
        }
    });
    const dbConnect = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let pool = yield mssql_1.default.connect(dbConfig);
            let result = yield pool.request()
                .query('select * from Employee');
            console.log("Result from db : ", result);
        }
        catch (error) {
            throw error;
        }
    });
    dbConnect();
    yield server.start();
    console.log(`Server is running on port ${server.info.uri}`);
});
exports.init = init;
process.on('unhandledRejection', (error) => {
    console.log("Error in rejection : ", error);
    process.exit(1);
});
(0, exports.init)();
function vivo(arg0, vivo, arg2, VIVO, arg4) {
    throw new Error("Function not implemented.");
}
function VIVO(arg0, vivo, arg2, VIVO, arg4) {
    throw new Error("Function not implemented.");
}
