import { Request } from "@hapi/hapi"
import sql from "mssql"
import sqlInstance from "mssql"
import config from "../config/config"
import { IEmployee } from "../interface/type"
import { employeeValidationSchema } from "../validation/validationSchema"

class EmployeeController {

    public async poolconnection() {
        const pool =  await sql.connect(config)
        // const pool =  await new sqlInstance.ConnectionPool(config).connect()
        const result = await pool.request()
        return result
    }

    public addEmployee = async(request : Request) => {
        try {
            const validation = employeeValidationSchema(request.payload)
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
            const employee = request.payload as IEmployee
            const result = await this.poolconnection()
            const newEmployee = await result
                        .input('id', sql.Int, employee.id)
                        .input('name', sql.VarChar,employee.name)
                        .input('age', sql.Int,employee.age)
                        .input('city', sql.VarChar,employee.city)
                        .input('salary', sql.Int,employee.salary)
                        .execute('insertEmployee')
            return newEmployee.recordsets
        } catch (error) {
            console.log("Cannot add employee : ", error)
            throw error
        }
    }

    public updateEmployee = async(request : Request) => {
        try {
            const validation = employeeValidationSchema(request.payload)
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

            const uid = request.params.id   
            const employee = request.payload as IEmployee 
            const result = await this.poolconnection()
            const updatedEmployee = await result
                    .input('uid', sql.Int, uid)
                    .input('uname', sql.VarChar, employee.name)
                    .input('uage', sql.Int, employee.age)
                    .input('ucity', sql.VarChar, employee.city)
                    .input('usalary', sql.Int, employee.salary)
                    .execute('updateEmployeeById')
            return updatedEmployee.recordsets
        } catch (error) {
            console.log("Cannot update employee : ", error)
            throw error
        }
    }

    public getEmployee = async(request : Request) => {
        try {
            const eid = request.params.id
            const result = await this.poolconnection()
            const getemployee = await result
                    .input('eid', sql.Int, eid)
                    .execute('getEmployeeById')
            return getemployee.recordsets
        } catch (error) {
            console.log("Cannot get employee : ", error)
            throw error
        }
    }

    public getEmployees = async() => {
        try {
            const result = await this.poolconnection()
            const getemployees = await result
                    .execute('getAllEmployee')
            return getemployees.recordsets
        } catch (error) {
            console.log("Cannot get employees : ", error)
            throw error
        }
    }

    public deleteEmployee = async(request : Request) => {
        try {
            const did = request.params.id
            const result = await this.poolconnection()
            const removeEmployee = await result
                    .input('did', sql.Int, did)
                    .execute('deleteEmployeeById')
            return removeEmployee.recordsets            
        } catch (error) {
            console.log("Cannot delete employee : ", error)
            throw error
        }
    }
}

export default EmployeeController

