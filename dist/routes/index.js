"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EmployeeController_1 = __importDefault(require("../controller/EmployeeController"));
const employeeController = new EmployeeController_1.default();
const routes = (server) => {
    server.route({
        method: 'GET',
        path: '/api/employees',
        handler: employeeController.getEmployees
    });
    server.route({
        method: 'GET',
        path: '/api/employees/{id}',
        handler: employeeController.getEmployee
    });
    server.route({
        method: 'POST',
        path: '/api/employees',
        handler: employeeController.addEmployee
    });
    server.route({
        method: 'DELETE',
        path: '/api/employees/{id}',
        handler: employeeController.deleteEmployee
    });
    server.route({
        method: 'PUT',
        path: '/api/employees/{id}',
        handler: employeeController.updateEmployee
    });
};
exports.default = routes;
