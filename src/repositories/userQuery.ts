import { dbServer } from "../database"
import { IEmployee, IUser } from "../interface/type"

export class UserQuery {
    public pool: any

    constructor() {
        (async() => {
            this.pool = await dbServer
        })()
    }

    public async getSingleUserQuery(eid: number) {
        return await this.pool.query('exec getEmployeeById @eid="' + eid + '"')
    }

    public async getUsersQuery() {
        return await this.pool.query('exec getAllEmployee')
    }

    public async addEmployeeQuery(userData: IEmployee) {
        return await this.pool.query(
            'exec insertEmployee @id="' + userData.id + '", @name="' + userData.name + '", @age="' + userData.age + '", @city="' + userData.city + '", @salary="' + userData.salary + '"'
        )
    }

    public async deleteEmployeeQuery(did: number) {
        return await this.pool.query('exec deleteEmployeeById @did="' + did + '"')
    }

    public async updateEmployeeQuery(uid: number, userData: IEmployee) {
        return await this.pool.query(
            'exec updateEmployeeById @uid="' + uid + '", @uname="' + userData.name + '", @uage="' + userData.age + '", @ucity="' + userData.city + '", @usalary="' + userData.salary + '"'
        )
    }

    public async addUserQuery(data: IUser, hashedPassword: string) {
        return await this.pool.query(
            'exec insertUser @iUsername="' + data.username + '", @iEmail="' + data.email + '", @iPassword="' + hashedPassword + '"     '
        )
    }

    public async loginUserQuery (email: string) {
        return await this.pool.query(
            'exec loginUser @lemail="' + email + '" '
        )
    }

    public async updateUserQuery(uid:number, data: IUser) {
        return await this.pool.query(
            'exec updateUserById @usid="'+uid+'", @usname="' +data.username+ '", @uspassword="'+data.password+'" '
        )
    }

}
