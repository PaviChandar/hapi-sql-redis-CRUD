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
const dbConfig_1 = __importDefault(require("./config/dbConfig"));
const mssql_1 = __importDefault(require("mssql"));
const routes_1 = __importDefault(require("./routes"));
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    const server = new hapi_1.Server({
        port: 4000,
        host: "localhost",
    });
    (0, routes_1.default)(server);
    const dbConnect = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield mssql_1.default.connect(dbConfig_1.default);
            console.log("DB server connected");
        }
        catch (error) {
            console.log("error in catch : ", error);
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
