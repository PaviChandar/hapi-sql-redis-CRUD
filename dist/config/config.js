"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hapiHost = exports.hapiPort = void 0;
const convict_1 = __importDefault(require("convict"));
const config = (0, convict_1.default)({
    db: {
        server: {
            doc: 'Database host',
            format: '*',
            default: 'localhost',
            env: 'server',
        },
        port: {
            doc: 'DB port',
            format: Number,
            default: 1433,
            env: 'port',
        },
        database: {
            doc: 'Database name',
            format: String,
            default: 'Employee',
            env: 'database',
        },
        user: {
            doc: ' username',
            format: String,
            default: 'sa',
            env: 'user',
        },
        password: {
            doc: 'database password',
            format: String,
            default: 'Aspire@123',
            env: 'password',
        },
        options: {
            trustServerCertificate: {
                doc: 'options',
                format: Boolean,
                default: true,
            }
        }
    },
    hapi: {
        host: {
            doc: 'localhost',
            format: String,
            default: 'localhost'
        },
        port: {
            doc: 'port to bind',
            format: 'port',
            default: 4000
        }
    },
    cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-with']
    }
});
exports.hapiPort = config.get('hapi.port');
exports.hapiHost = config.get('hapi.host');
config.loadFile('.env');
exports.default = config;
