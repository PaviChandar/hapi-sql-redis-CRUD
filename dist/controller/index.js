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
class EmployeeController {
    constructor() {
        this.addEmployee = (request) => __awaiter(this, void 0, void 0, function* () {
            try {
                const employee = request.payload;
                const pool = yield mssql_1.default.connect(dbConfig_1.default);
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
                console.log("inside getemp try");
                const employeeId = request.params.id;
                console.log("Employee id : ", employeeId);
                const pool = yield mssql_1.default.connect(dbConfig_1.default);
                const result = yield pool.request()
                    .input('empId', mssql_1.default.Int, employeeId)
                    .query('SELECT name from employee where id = @empId');
                console.log("Result from getEmployee : ", result);
                return result.recordsets;
            }
            catch (error) {
                console.log("Cannot get employee : ", error);
                throw error;
            }
        });
        this.getEmployees = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const pool = yield mssql_1.default.connect(dbConfig_1.default);
                const result = yield pool.request()
                    .query('select * from employee');
                console.log("Result from getEmployees : ", result);
                return result.recordsets;
            }
            catch (error) {
                console.log("Cannot get employees : ", error);
                throw error;
            }
        });
        this.updateEmployee = (request) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("inside update employee");
                const employeeId = request.params.id;
                console.log("employee id : ", employeeId);
                const pool = yield mssql_1.default.connect(dbConfig_1.default);
                const result = yield pool.request()
                    .input('empId', mssql_1.default.Int, employeeId)
                    .execute('updateEmployeeById');
                console.log("Result from update Employee : ", result);
                return result.recordsets;
            }
            catch (error) {
                console.log("Cannot update employee : ", error);
                throw error;
            }
        });
        this.deleteEmployee = (request) => __awaiter(this, void 0, void 0, function* () {
            try {
                const employeeId = request.params.id;
                if (employeeId === null) {
                    return "Id not found!";
                }
                else {
                    const pool = yield mssql_1.default.connect(dbConfig_1.default);
                    const result = yield pool.request()
                        .input('empId', mssql_1.default.Int, employeeId)
                        .query('delete from employee where id = @empId');
                    console.log("Result from deleteEmployee : ", result);
                    return result;
                }
            }
            catch (error) {
                console.log("Cannot delete employee : ", error);
                throw error;
            }
        });
    }
}
exports.default = EmployeeController;
