import jwt from "jsonwebtoken"

export const accessToken = (userId : number) => {
    const token = jwt.sign(
        {
            id : userId
        },
        "secret_token"
    )
    return token
}