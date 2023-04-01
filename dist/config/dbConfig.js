"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbConfig = {
    user: 'sa',
    password: 'Aspire@123',
    port: 1433,
    server: "localhost",
    database: 'Employee',
    options: {
        trustServerCertificate: true
    }
};
exports.default = dbConfig;
