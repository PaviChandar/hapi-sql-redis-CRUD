"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const convict_1 = __importDefault(require("convict"));
const config = (0, convict_1.default)({
    user: {
        doc: 'sa',
        format: String
    },
    password: {
        doc: 'Aspire@123',
        format: String,
        sensitive: true
    },
    server: {
        port: {
            doc: 'localhost',
            format: Number,
            default: 1433
        },
        host: {
            doc: 'localhost',
            format: String,
            default: 'localhost'
        },
    },
    db: {
        name: {
            doc: 'Employee',
            default: 'Employee'
        }
    },
    options: {
        trustServerCertificate: true
    },
    hapi: {
        host: {
            doc: 'localhost',
            format: String,
            default: 'localhost'
        },
        port: {
            doc: 'localhost',
            format: Number,
            default: 4000
        }
    }
});
// const config: any = {
//     user: 'sa',
//     password: 'Aspire@123',
//     port: 1433,
//     server: 'localhost',
//     database: 'Employee',
//     options: {
//         trustServerCertificate: true
//     }
// }
exports.default = config;
