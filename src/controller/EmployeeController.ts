import { Request, ResponseToolkit } from "@hapi/hapi"
import { IEmployee } from "../interface/type"
import { UserQuery } from "../repositories/userQuery"
import { employeeValidationSchema } from "../validation/validationSchema"

const query = new UserQuery

class EmployeeController {

    public addEmployee = async(req : Request, res : ResponseToolkit) => {
        try {
            const validation = employeeValidationSchema(req.payload)
                if (validation.error?.isJoi) {
                    const errors: any = []
                    validation.error.details.forEach((detail) => {
                        let error: any = {
                            [detail.path.toString()]: detail.message
                        }
                            errors.push(error)
                    })            
                    return errors
                }
            const employee = req.payload as IEmployee
            const data = await query.addEmployeeQuery(employee)
            return res.response(data.recordset[0])
        } catch (error) {
            console.log("Cannot add employee : ", error)
            throw error
        }
    }

    public updateEmployee = async(req : Request, res : ResponseToolkit) => {
        try {
            const validation = employeeValidationSchema(req.payload)
            if (validation.error?.isJoi) {
                const errors: any = []
                validation.error.details.forEach((detail) => {
                    let error: any = {
                        [detail.path.toString()]: detail.message
                    }
                    errors.push(error)
                })    
                return errors
            }

            const uid = req.params.id   
            const employee = req.payload as IEmployee
            const data = await query.updateEmployeeQuery(uid, employee)
            return res.response(data.recordset[0])
        } catch (error) {
            console.log("Cannot update employee : ", error)
            throw error
        }
    }

    public getEmployee = async(request : Request,res : ResponseToolkit) => {
        try {
            const eid = request.params.id
            const data = await query.getSingleUserQuery(eid)
            return res.response(data.recordset[0])
        } catch (error) {
            console.log("Cannot get employee : ", error)
            throw error
        }
    }

    public getEmployees = async(res : ResponseToolkit) => {
        try {
            const data = await query.getUsersQuery()
            return res.response(data.recordset)
        } catch(error) {
            console.log("Error in getEmployee : ", error)
            throw error
        }
    }

    public deleteEmployee = async(req: Request, res: ResponseToolkit) => {
        try {
            const did = req.params.id  
            console.log("delete id : ", did)
            const data = await query.deleteEmployeeQuery(did)
            console.log(data)
            return res.response(data.recordset[0])
        } catch (error) {
            console.log("Cannot delete employee : ", error)
            throw error
        }
    }
}

export default EmployeeController

