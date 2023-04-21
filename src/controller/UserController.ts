import { Request, ResponseToolkit } from "@hapi/hapi"
import { IUser } from "../interface/type"
import { userValidationSchema } from "../validation/validationSchema"
import { UserQuery } from "../repositories/userQuery"
import bcrypt, { genSalt } from "bcryptjs"
import { accessToken } from "../utils/token"
import { LOGIN_FAILURE, LOGIN_SUCCESS, PASSWORD_INCORRECT } from "../constants/constants"

const query = new UserQuery

class UserController {

    public addUser = async(req : Request, res : ResponseToolkit) => {
        try {
            const validation = userValidationSchema(req.payload)
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
            const user = req.payload as IUser
            const userpw = user.password
            const saltRounds = 10
            const hashedpassword = await bcrypt.hash(userpw, saltRounds)
            const data = await query.addUserQuery(user, hashedpassword)
            return res.response(data.recordset[0])       
        } catch (error) {
            console.log("Cannot add user : ", error)
            throw error
        }
    }

    public login = async(req: Request, res: ResponseToolkit) => {
        try {
            const user = req.payload as IUser
            const userEmail = user.email
            const userPassword = user.password
            const loginData = await query.loginUserQuery(userEmail)
            if(!loginData.recordset) {
                console.log("inside if")
                console.log("Login failed for user")
                return res.response({ message : LOGIN_FAILURE })
            }
            const validatePassword = await bcrypt.compare(userPassword, loginData.recordset[0].userpassword)
            if(!validatePassword) {
                return res.response({ message : PASSWORD_INCORRECT})
            }
            const token = accessToken(loginData.recordset[0].id)
            return res.response({ message : LOGIN_SUCCESS, data : loginData.recordset[0], token })
        } catch (error) {
            console.log("Cannot login employee")
            throw error
        }
    }
}

export default UserController

