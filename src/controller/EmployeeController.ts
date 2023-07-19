import { Request, ResponseToolkit } from "@hapi/hapi"
import { ADD_SUCCESS, DELETE_SUCCESS, EDIT_SUCCESS } from "../constants/constants"

import { SUCCESS, BAD_REQUEST } from "../constants/httpCode"
import { IEmployee } from "../interface/type"
import { UserQuery } from "../repositories/userQuery"
import { employeeValidationSchema } from "../validation/validationSchema"

interface ErrorType {
    path: [string]
    message: string
}

const query = new UserQuery

class EmployeeController {

    public addEmployee = async(req : Request, res : ResponseToolkit) => {
        try {
            const validation = employeeValidationSchema(req.payload)
                if (validation.error?.isJoi) {
                    const errors: any = []
                    validation.error.details.forEach((detail) => {
                        let error: object = {
                            [detail.path.toString()]: detail.message
                        }
                        errors.push(error)
                    })            
                    throw errors
                }
            const employee = req.payload as IEmployee
            const data = await query.addEmployeeQuery(employee)
            return res.response({ message: ADD_SUCCESS, data: data.recordset }).code(SUCCESS)
        } catch (error) {
            return res.response({ message : error }).code(BAD_REQUEST)
        }
    }

    public updateEmployee = async(req : Request, res : ResponseToolkit) => {
        try {
            const validation = employeeValidationSchema(req.payload)
            if (validation.error?.isJoi) {
                const errors: any = []
                validation.error.details.forEach((detail) => {
                    let error: object = { 
                        [detail.path.toString()]: detail.message
                    }
                    errors.push(error)
                })    
                throw errors
            }

            const uid = req.params.id   
            const employee = req.payload as IEmployee
            const data = await query.updateEmployeeQuery(uid, employee)
            return res.response({ message: EDIT_SUCCESS, data: data.recordset }).code(SUCCESS)
        } catch (error) {
            return res.response({ message : error }).code(BAD_REQUEST)
        }
    }

    public getEmployee = async(request : Request,res : ResponseToolkit) => {
        try {
            const eid = request.params.id
            const data = await query.getSingleUserQuery(eid)
            return res.response(data.recordset[0]).code(SUCCESS)
        } catch (error) {
            return res.response({ message : "Cannot get employee"}).code(BAD_REQUEST)
        }
    }

    public getEmployees = async(req: Request, res : ResponseToolkit) => {
        try {
            const data = await query.getEmployeesQuery()
            return res.response({ data: data.recordset }).code(SUCCESS)
        } catch(error) {
            console.log("Error in getEmployee : ", error)
            return res.response({ message : "Cannot get employees "}).code(BAD_REQUEST)
        }
    }

    public deleteEmployee = async(req: Request, res: ResponseToolkit) => {
        console.log("inside del emp")
        try {
            const did = req.params.id  
            const data = await query.deleteEmployeeQuery(did)
            return res.response({ message:DELETE_SUCCESS, data: data.recordset }).code(SUCCESS)
        } catch(error) {   
            return res.response({ message : "Cannot delete employee" }).code(BAD_REQUEST)
        }
    }
}

export default EmployeeController

