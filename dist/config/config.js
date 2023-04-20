"use strict";
// import convict from "convict"
Object.defineProperty(exports, "__esModule", { value: true });
// const config: any = convict( 
//     {
//         user: {
//             doc: 'sa',
//             format: String,
//             default:'sa'
//         },
//         password: {
//             doc: 'Aspire@123',
//             format: String,
//             default: 'Aspire@123',
//             sensitive : true
//         },
//         server:'localhost' ,
//         port: {
//             doc: 'port to bind',
//             format: 'port',
//             default: 1433
//         },
//         host: {
//             doc: 'localhost',
//             format: String,
//             default: 'localhost'
//         },
//         db: {
//             host: {
//                 doc: 'localhost',
//                 format: String,
//                 default: 'localhost'
//             },
//             name: {
//                 doc: 'Employee',
//                 format: String,
//                 default: 'Employee'
//             }
//         },
//         options: {
//             trustServerCertificate: true
//         },
//         hapi: {
//             host: {
//                 doc:'localhost',
//                 format: String,
//                 default: 'localhost'
//             },
//             port: {
//                 doc:'port to bind',
//                 format: 'port',
//                 default: 4000
//             }
//         }
//     }
// )
// export const hapiPort = config.get('hapi.port')
// export const hapiHost = config.get('hapi.host')
// const dbport = config.get('port')
//  const dbhost = config.get('host')
//  const dbUser = config.get('user')
//  const dbpassword = config.get('password')
//  const db = config.get('db.name')
// export const dbConfig = {
//     port: dbport, 
//     host: dbhost,
//     user: dbUser, 
//     password: dbpassword, 
//     database: db
// }
// console.log("dbconfig port : ", dbConfig.port)
const config = {
    user: 'sa',
    password: 'Aspire@123',
    port: 1433,
    server: 'localhost',
    database: 'Employee',
    options: {
        trustServerCertificate: true
    }
};
exports.default = config;
