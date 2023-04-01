import { Server } from "@hapi/hapi";
import EmployeeController from "../controller";

const employeeController = new EmployeeController()

const routes = (server : Server) => {

        server.route({
            method:'GET',
            path:'/api/employees',
            handler: employeeController.getEmployees
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
}

export default routes