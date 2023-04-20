import jwt from "jsonwebtoken"

const createToken = async(userdata:any) => {
    const token = jwt.sign(
        {
            name: userdata.username,
            email: userdata.email
        },
        "secrettoken"
    )
    return token
}

export default createToken