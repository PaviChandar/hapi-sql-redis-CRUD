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
const mssql_1 = __importDefault(require("mssql"));
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
const dbConnection = mssql_1.default.connect(dbConfig_1.default, error => {
    if (error) {
        console.log("DB connection error : ", error);
        throw error;
    }
    console.log("DB server connected");
});
class EmployeeController {
    constructor() {
        this.addEmployee = (request) => __awaiter(this, void 0, void 0, function* () {
            try {
                const employee = request.payload;
                const pool = yield dbConnection;
                const result = yield pool.request()
                    .input('id', mssql_1.default.Int, employee.id)
                    .input('name', mssql_1.default.VarChar, employee.name)
                    .input('age', mssql_1.default.Int, employee.age)
                    .input('city', mssql_1.default.VarChar, employee.city)
                    .input('salary', mssql_1.default.Int, employee.salary)
                    .execute('insertEmployee');
                return result.recordsets;
            }
            catch (error) {
                console.log("Cannot add employee : ", error);
                throw error;
            }
        });
        this.getEmployee = (request) => __awaiter(this, void 0, void 0, function* () {
            try {
                const eid = request.params.id;
                const pool = yield dbConnection;
                const result = yield pool.request()
                    .input('eid', mssql_1.default.Int, eid)
                    .execute('getEmployeeById');
                return result.recordsets;
            }
            catch (error) {
                console.log("Cannot get employee : ", error);
                throw error;
            }
        });
        this.getEmployees = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const pool = yield dbConnection;
                const result = yield pool.request()
                    .execute('getAllEmployee');
                return result.recordsets;
            }
            catch (error) {
                console.log("Cannot get employees : ", error);
                throw error;
            }
        });
        this.updateEmployee = (request) => __awaiter(this, void 0, void 0, function* () {
            try {
                const uid = request.params.id;
                const employee = request.payload;
                const pool = yield dbConnection;
                const result = yield pool.request()
                    .input('uid', mssql_1.default.Int, uid)
                    .input('uname', mssql_1.default.VarChar, employee.name)
                    .input('uage', mssql_1.default.Int, employee.age)
                    .input('ucity', mssql_1.default.VarChar, employee.city)
                    .input('usalary', mssql_1.default.Int, employee.salary)
                    .execute('updateEmployeeById');
                return result.recordsets;
            }
            catch (error) {
                console.log("Cannot update employee : ", error);
                throw error;
            }
        });
        this.deleteEmployee = (request) => __awaiter(this, void 0, void 0, function* () {
            try {
                const did = request.params.id;
                const pool = yield dbConnection;
                const result = yield pool.request()
                    .input('did', mssql_1.default.Int, did)
                    .execute('deleteEmployeeById');
                return result.recordsets;
            }
            catch (error) {
                console.log("Cannot delete employee : ", error);
                throw error;
            }
        });
    }
}
exports.default = EmployeeController;
