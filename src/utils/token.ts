import jwt from "jsonwebtoken"

export const accessToken = (userId : number, login: number) => {
    const token = jwt.sign(
        {
            id : userId,
            login: login
        },
        "secret_token"
    )
    return token
}