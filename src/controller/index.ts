import { Request, ResponseSettings, ResponseToolkit } from "@hapi/hapi"
import sql from "mssql"
import dbConfig from "../config/dbConfig"
import { IEmployee } from "../interface/type"

class EmployeeController {

    public addEmployee = async(request : Request) => { 
        try {
            const employee = request.payload as IEmployee
            const pool = await sql.connect(dbConfig)
            const result = await pool.request()
                .input('id', sql.Int, employee.id)
                .input('name', sql.VarChar,employee.name)
                .input('age', sql.Int,employee.age)
                .input('city', sql.VarChar,employee.city)
                .input('salary', sql.Int,employee.salary)
                .execute('insertEmployee')
            return result.recordsets
        } catch (error) {
            console.log("Cannot add employee : ", error)
            throw error
        }
    }

    public getEmployee = async(request : Request) => {
        try {
            console.log("inside getemp try")
            const employeeId = request.params.id
            console.log("Employee id : ", employeeId)
            const pool = await sql.connect(dbConfig)
            const result = await pool.request()
                        .input('empId', sql.Int, employeeId)
                        .query('SELECT name from employee where id = @empId')
            console.log("Result from getEmployee : ", result)
            return result.recordsets
        } catch (error) {
            console.log("Cannot get employee : ", error)
            throw error
        }
    }

    public getEmployees = async() => {
        try {
            const pool = await sql.connect(dbConfig)
            const result = await pool.request()
                         .query('select * from employee')
            console.log("Result from getEmployees : ", result)
            return result.recordsets
        } catch (error) {
            console.log("Cannot get employees : ", error)
            throw error
        }
    }

    public updateEmployee = async(request : Request) => {
        try {
            console.log("inside update employee");  
            const employeeId = request.params.id    
            console.log("employee id : ", employeeId)      
            const pool = await sql.connect(dbConfig)
            const result = await pool.request()
                            .input('empId', sql.Int, employeeId)
                            .execute('updateEmployeeById')
            console.log("Result from update Employee : ", result)
            return result.recordsets
        } catch (error) {
            console.log("Cannot update employee : ", error)
            throw error
        }
    }

    public deleteEmployee = async(request : Request) => {
        try {
            const employeeId = request.params.id
            if (employeeId === null) {
                return "Id not found!"
            } else {
                const pool = await sql.connect(dbConfig)
                const result = await pool.request()
                                 .input('empId', sql.Int, employeeId)
                                 .query('delete from employee where id = @empId')
                console.log("Result from deleteEmployee : ", result) 
                return  result
            }               
        } catch (error) {
            console.log("Cannot delete employee : ", error)
            throw error
        }
    }
}

export default EmployeeController