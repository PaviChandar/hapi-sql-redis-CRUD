import { Request } from "@hapi/hapi"
import sqlInstance from "mssql"
import sql from "mssql"
import dbConfig from "../config/dbConfig"
import { IUser } from "../interface/type"
import { userValidationSchema } from "../validation/validationSchema"

class UserController {
    public async poolconnection()  {
        // const pool =  await new sqlInstance.ConnectionPool(dbConfig).connect()
        const pool =  await sql.connect(dbConfig)
        const result = await pool.request()
        return result
    }

    public addUser = async(request : Request) => {
        try {
            const validation = userValidationSchema(request.payload)
            if (validation.error) {
                const errors: any = []
                validation.error.details.forEach((detail) => {
                    let error: any = {
                        [detail.path.toString()]: detail.message
                    }
                        errors.push(error)
                })            
                return errors
            }
            const user = request.payload as IUser
            const result = await this.poolconnection()
            const newUser = await result
                            .input('iUsername', sql.NVarChar, user.username)
                            .input('iEmail', sql.NVarChar, user.email)
                            .input('iPassword', sql.NVarChar, user.password)
                            .execute('insertUser')
            return newUser.recordsets
        } catch (error) {
            console.log("Cannot add user : ", error)
            throw error
        }
    }
}

export default UserController