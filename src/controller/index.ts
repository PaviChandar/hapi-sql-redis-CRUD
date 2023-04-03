import { Request } from "@hapi/hapi"
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
            return result.recordsets
        } catch (error) {
            console.log("Cannot get employees : ", error)
            throw error
        }
    }

    public updateEmployee = async(request : Request) => {
        try {
            const uid = request.params.id   
            const employee = request.payload as IEmployee 
            const pool = await sql.connect(dbConfig)
            const result = await pool.request()
                        .input('uid', sql.Int, uid)
                        .input('uname', sql.VarChar, employee.name)
                        .input('uage', sql.Int, employee.age)
                        .input('ucity', sql.VarChar, employee.city)
                        .input('usalary', sql.Int, employee.salary)
                        .execute('updateEmployeeById')
            return result.recordsets
        } catch (error) {
            console.log("Cannot update employee : ", error)
            throw error
        }
    }

    public deleteEmployee = async(request : Request) => {
        try {
            const employeeId = request.params.id
                const pool = await sql.connect(dbConfig)
                const result = await pool.request()
                                 .input('empId', sql.Int, employeeId)
                                 .query('delete from employee where id = @empId')
                return  result             
        } catch (error) {
            console.log("Cannot delete employee : ", error)
            throw error
        }
    }
}

export default EmployeeController