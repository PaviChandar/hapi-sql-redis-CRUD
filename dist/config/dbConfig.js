"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const convict_1 = __importDefault(require("convict"));
const dbConfig = (0, convict_1.default)({
    user: {
        doc: 'sa',
        format: String
    },
    password: {
        doc: 'Aspire@123',
        format: String,
        sensitive: true
    },
    // server: {
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
    // },
    server: {
        // doc: 'localhost',
        format: String,
        // default: 'localhost'
    },
    db: {
        name: {
            doc: 'Employee',
            default: 'Employee'
        }
    },
    options: {
        trustServerCertificate: true
    }
});
exports.default = dbConfig;
// const schema = {
//     env: {
//         doc: 'Environment that the application will run in',
//         format: ['production', 'development', 'test'],
//         default: 'development',
//         env: 'NODE_ENV',
//     },
//     port: {
//         doc: 'HTTP port n8n can be reached',
//         format: Number,
//         default: 1433,
//         env: 'PORT',
//         arg: 'port',
//       },
//     db: {
//         host: {
//           doc: 'Database host name/IP address',
//           format: '*',
//           default: 'localhost',
//         },
//         name: {
//           doc: 'Database name',
//           format: String,
//           default: 'Employee',
//         },
//     },
// }
// const dbConfig = convict(schema)
// const port = dbConfig.get('port')
// console.log("port : ", port)
// export default dbConfig
// const dbConfig = convict({
//     dbs:{
//         db1: {
//             host: {
//                 doc: 'localhost',
//                 format: '*',
//                 default: 'localhost'
//             },
//             user:{
//                 doc: 'sa',
//                 format: String
//             },
//             pass: {
//                 doc: 'Aspire@123',
//                 format: String,
//                 sensitive: true
//             },
//             name: {
//                 doc: 'Employee',
//                 format: String,
//                 default: 'users'
//             }
//         }
//     }
// })
// dbConfig.validate({allowed : 'strict'})
// export default dbConfig
