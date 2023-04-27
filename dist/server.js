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
const routes_1 = __importDefault(require("./routes"));
const config_1 = require("./config/config");
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    const server = new hapi_1.Server({
        port: config_1.hapiPort,
        host: config_1.hapiHost,
        routes: {
            cors: {
                origin: ['*'],
                headers: ['Authorization'],
                exposedHeaders: ['Accept'],
                additionalExposedHeaders: ['Accept'],
                credentials: true
            }
        }
    });
    (0, routes_1.default)(server);
    yield server.start();
    console.log(`Server is running on port ${server.info.uri}`);
});
exports.init = init;
process.on('unhandledRejection', (error) => {
    console.log("Error in rejection : ", error);
    process.exit(1);
});
(0, exports.init)();
