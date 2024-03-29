export interface IEmployee {
    id: number,
    name: string,
    age: number,
    city: string,
    salary: number
}

export interface IUser {
    id?: number
    username: string,
    email: string,
    password: string,
    confirmpassword?: string
}