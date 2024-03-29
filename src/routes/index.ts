import { Server } from "@hapi/hapi";

import EmployeeController from "../controller/EmployeeController";
import UserController from "../controller/UserController";

const employeeController = new EmployeeController()
const userController = new UserController()

const routes = (server : Server) => {

        server.route({
            method:'GET',
            path:'/api/employees',
            handler: employeeController.getEmployees,
        })

        server.route({
            method:'GET',
            path:'/api/employees/{id}',
            handler: employeeController.getEmployee    
        })

        server.route({
            method:'POST',
            path:'/api/employees',
            handler: employeeController.addEmployee
        })

        server.route({
            method:'DELETE',
            path:'/api/employees/{id}',
            handler: employeeController.deleteEmployee
        })

        server.route({
            method:'PUT',
            path:'/api/employees/{id}',
            handler:employeeController.updateEmployee
        })

        server.route({
            method:'POST',
            path:'/api/users',
            handler:userController.addUser
        })

        server.route({
            method: 'POST',
            path: '/api/login',
            handler: userController.loginUser
        })

        server.route({
            method: 'PUT',
            path: '/api/user/{id}',
            handler: userController.editUser
        })

        server.route({
            method:'GET',
            path:'/api/user/{id}',
            handler: userController.viewUser 
        })

        server.route({
            method:'GET',
            path:'/api/users',
            handler: userController.getUsers 
        })
}

export default routes