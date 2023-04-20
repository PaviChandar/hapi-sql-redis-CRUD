import { Request } from "@hapi/hapi"
import sql from "mssql"
import sqlInstance from "mssql"
// import { dbConfig }  from "../config/config"
import { IUser } from "../interface/type"
import { userValidationSchema } from "../validation/validationSchema"
import createToken from "../utils/token"
import config from "../config/config"

class UserController {
    public async poolconnection()  {
        // const pool =  await new sqlInstance.ConnectionPool(config).connect()
        const pool =  await sql.connect(config)
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

    public login = async(request: Request) => {
        try {
            const loginValue = request.payload as IUser
            const result = await this.poolconnection()
            const loginUser = await result
                            .input('lemail', sql.NVarChar, loginValue.email)
                            .execute('loginUser')
            createToken(loginValue)
            return loginUser.recordsets
        } catch (error) {
            throw error
        }
    }
}

export default UserController