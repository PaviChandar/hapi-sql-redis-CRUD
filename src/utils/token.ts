import jwt from "jsonwebtoken"

export const accessToken = (userId : number, login: number, name: string) => {
    const token = jwt.sign(
        {
            id : userId,
            login: login,
            username: name
        },
        "secret_token"
    )
    return token
}