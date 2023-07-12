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
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants/constants");
const httpCode_1 = require("../constants/httpCode");
const userQuery_1 = require("../repositories/userQuery");
const validationSchema_1 = require("../validation/validationSchema");
const query = new userQuery_1.UserQuery;
class EmployeeController {
    constructor() {
        this.addEmployee = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const validation = (0, validationSchema_1.employeeValidationSchema)(req.payload);
                if ((_a = validation.error) === null || _a === void 0 ? void 0 : _a.isJoi) {
                    const errors = [];
                    validation.error.details.forEach((detail) => {
                        let error = {
                            [detail.path.toString()]: detail.message
                        };
                        errors.push(error);
                    });
                    throw errors;
                }
                const employee = req.payload;
                const data = yield query.addEmployeeQuery(employee);
                console.log("data : ", data);
                console.log("emp : ", employee);
                return res.response({ message: constants_1.ADD_SUCCESS, data: data.recordset }).code(httpCode_1.SUCCESS);
            }
            catch (error) {
                return res.response({ message: error }).code(httpCode_1.BAD_REQUEST);
            }
        });
        this.updateEmployee = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _b;
            try {
                const validation = (0, validationSchema_1.employeeValidationSchema)(req.payload);
                if ((_b = validation.error) === null || _b === void 0 ? void 0 : _b.isJoi) {
                    const errors = [];
                    validation.error.details.forEach((detail) => {
                        let error = {
                            [detail.path.toString()]: detail.message
                        };
                        errors.push(error);
                    });
                    throw errors;
                }
                const uid = req.params.id;
                const employee = req.payload;
                const data = yield query.updateEmployeeQuery(uid, employee);
                return res.response({ message: constants_1.EDIT_SUCCESS, data: data.recordset[0] }).code(httpCode_1.SUCCESS);
            }
            catch (error) {
                return res.response({ message: error }).code(httpCode_1.BAD_REQUEST);
            }
        });
        this.getEmployee = (request, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const eid = request.params.id;
                const data = yield query.getSingleUserQuery(eid);
                return res.response(data.recordset[0]).code(httpCode_1.SUCCESS);
            }
            catch (error) {
                return res.response({ message: "Cannot get employee" }).code(httpCode_1.BAD_REQUEST);
            }
        });
        this.getEmployees = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield query.getUsersQuery();
                return res.response({ data: data.recordset }).code(httpCode_1.SUCCESS);
            }
            catch (error) {
                console.log("Error in getEmployee : ", error);
                return res.response({ message: "Cannot get employees " }).code(httpCode_1.BAD_REQUEST);
            }
        });
        this.deleteEmployee = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("inside del emp");
            try {
                const did = req.params.id;
                const data = yield query.deleteEmployeeQuery(did);
                return res.response({ message: constants_1.DELETE_SUCCESS, data: data.recordset }).code(httpCode_1.SUCCESS);
            }
            catch (error) {
                return res.response({ message: "Cannot delete employee" }).code(httpCode_1.BAD_REQUEST);
            }
        });
    }
}
exports.default = EmployeeController;
