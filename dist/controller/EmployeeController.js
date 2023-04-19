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
const validationSchema_1 = require("../validation/validationSchema");
class EmployeeController {
    constructor() {
        this.addEmployee = (request) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const validation = (0, validationSchema_1.employeeValidationSchema)(request.payload);
                if ((_a = validation.error) === null || _a === void 0 ? void 0 : _a.isJoi) {
                    const errors = [];
                    validation.error.details.forEach((detail) => {
                        let error = {
                            [detail.path.toString()]: detail.message
                        };
                        errors.push(error);
                    });
                    return errors;
                }
                const employee = request.payload;
                const result = yield this.poolconnection();
                const newEmployee = yield result
                    .input('id', mssql_1.default.Int, employee.id)
                    .input('name', mssql_1.default.VarChar, employee.name)
                    .input('age', mssql_1.default.Int, employee.age)
                    .input('city', mssql_1.default.VarChar, employee.city)
                    .input('salary', mssql_1.default.Int, employee.salary)
                    .execute('insertEmployee');
                return newEmployee.recordsets;
            }
            catch (error) {
                console.log("Cannot add employee : ", error);
                throw error;
            }
        });
        this.updateEmployee = (request) => __awaiter(this, void 0, void 0, function* () {
            var _b;
            try {
                const validation = (0, validationSchema_1.employeeValidationSchema)(request.payload);
                if ((_b = validation.error) === null || _b === void 0 ? void 0 : _b.isJoi) {
                    const errors = [];
                    validation.error.details.forEach((detail) => {
                        let error = {
                            [detail.path.toString()]: detail.message
                        };
                        errors.push(error);
                    });
                    return errors;
                }
                const uid = request.params.id;
                const employee = request.payload;
                const result = yield this.poolconnection();
                const updatedEmployee = yield result
                    .input('uid', mssql_1.default.Int, uid)
                    .input('uname', mssql_1.default.VarChar, employee.name)
                    .input('uage', mssql_1.default.Int, employee.age)
                    .input('ucity', mssql_1.default.VarChar, employee.city)
                    .input('usalary', mssql_1.default.Int, employee.salary)
                    .execute('updateEmployeeById');
                return updatedEmployee.recordsets;
            }
            catch (error) {
                console.log("Cannot update employee : ", error);
                throw error;
            }
        });
        this.getEmployee = (request) => __awaiter(this, void 0, void 0, function* () {
            try {
                const eid = request.params.id;
                const result = yield this.poolconnection();
                const getemployee = yield result
                    .input('eid', mssql_1.default.Int, eid)
                    .execute('getEmployeeById');
                return getemployee.recordsets;
            }
            catch (error) {
                console.log("Cannot get employee : ", error);
                throw error;
            }
        });
        this.getEmployees = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.poolconnection();
                const getemployees = yield result
                    .execute('getAllEmployee');
                return getemployees.recordsets;
            }
            catch (error) {
                console.log("Cannot get employees : ", error);
                throw error;
            }
        });
        this.deleteEmployee = (request) => __awaiter(this, void 0, void 0, function* () {
            try {
                const did = request.params.id;
                const result = yield this.poolconnection();
                const removeEmployee = yield result
                    .input('did', mssql_1.default.Int, did)
                    .execute('deleteEmployeeById');
                return removeEmployee.recordsets;
            }
            catch (error) {
                console.log("Cannot delete employee : ", error);
                throw error;
            }
        });
    }
    poolconnection() {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield mssql_1.default.connect(dbConfig_1.default);
            // const pool =  await new sqlInstance.ConnectionPool(dbConfig).connect()
            const result = yield pool.request();
            return result;
        });
    }
}
exports.default = EmployeeController;
