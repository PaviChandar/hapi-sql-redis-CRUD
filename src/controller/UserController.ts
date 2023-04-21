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
            const hashpw = await bcrypt.hash(userpw, saltRounds)
            console.log("Hash pw in adduser : ", hashpw)
            const data = await query.addUserQuery(user)
            console.log("data of user : ", data.recordset[0])
            return res.response(data.recordset[0])       
        } catch (error) {
            console.log("Cannot add user : ", error)
            throw error
        }
    }

    public login = async(req: Request, res: ResponseToolkit) => {
        // try {
            const user = req.payload as IUser
            const userpw = user.password
            const saltRounds = 10
            // const hashpw = bcrypt.hash(userpw, saltRounds)
            //                      .then(hash => {
            //                      console.log('Hash ', hash)
            //                     })
            //                      .catch(err => console.error(err.message))
            console.log("user pw : ", userpw)
            
            const loginData = await query.loginUserQuery(user.email)
            const hashpass = JSON.stringify(loginData.recordset[0].passwordhash)
            console.log("hash : ", hashpass)
            const comparepw = await bcrypt.compare(userpw, hashpass)
            console.log("compared pw : ", comparepw)
            // if(loginData) {
            //     res.response({ message : LOGIN_FAILURE })
            //    const data= await bcrypt.compare(loginData.recordset[0].userpassword, hashpw)
            //    console.log(data)
            //     const access = accessToken(loginData.recordset[0].id)
            //     return res.response({ message: LOGIN_SUCCESS, data: loginData.recordset[0], access })
            // }
            // console.log(loginData.recordsets['userpassword'])
            // const passwordValidation = async() => {
            //     console.log("inside pw validation")
            //     const validatePassword = await bcrypt.compare(user.password, loginData.recordset[0].userpassword)
            //                                          .then(res => {
            //                                             console.log("response : ",res)
            //                                         })
            //                                          .catch(err => console.error("error msg : ",err.message))
            //     console.log(user.password)
            //     console.log('loginData',loginData.recordset[0].userpassword)
            //     console.log(validatePassword)
                // if(!validatePassword) {
                //     return res.response({ message : PASSWORD_INCORRECT})
                // }
            }
            // passwordValidation()
            
        // } catch(error) {
        //     console.log("Cannot login user : ", error)
        //     throw "Cannot login User"
        // }
    }


export default UserController

