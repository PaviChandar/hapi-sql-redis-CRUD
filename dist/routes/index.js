"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EmployeeController_1 = __importDefault(require("../controller/EmployeeController"));
const UserController_1 = __importDefault(require("../controller/UserController"));
const employeeController = new EmployeeController_1.default();
const userController = new UserController_1.default();
const routes = (server) => {
    server.route({
        method: 'GET',
        path: '/api/employees',
        handler: employeeController.getEmployees,
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
    server.route({
        method: 'POST',
        path: '/api/users',
        handler: userController.addUser
    });
    server.route({
        method: 'POST',
        path: '/api/login',
        handler: userController.loginUser
    });
    server.route({
        method: 'PUT',
        path: '/api/user/{id}',
        handler: userController.editUser
    });
    server.route({
        method: 'GET',
        path: '/api/user/{id}',
        handler: userController.viewUser
    });
    server.route({
        method: 'GET',
        path: '/api/users',
        handler: userController.getUsers
    });
};
exports.default = routes;
