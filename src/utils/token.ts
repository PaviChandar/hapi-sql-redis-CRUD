import jwt from "jsonwebtoken"

export const accessToken = ( id:number,login: number, name: string) => {
    const token = jwt.sign(
        {
            Id: id,
            login: login,
            username: name
        },
        "secret_token"
    )
    return token
}