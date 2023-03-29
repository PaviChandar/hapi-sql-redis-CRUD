import { Server } from "@hapi/hapi"
import sql from 'mssql'

const dbConfig: any = {
    user: 'sa',
    password: 'aspire@123',
    server: 'localhost',
    database: 'focaldb',
    options: {
        trustServerCertificate: true
    }
}

export const init = async () => {
    const server: Server = new Server({
        port: 4000,
        host: "localhost",
    })

    server.route({
        method: 'GET',
        path: '/',
        handler: function (req, h) {
            return "Hi server connection"
        }
    })

    const dbConnect = async () => {
        try {
            let pool = await sql.connect(dbConfig)
            let result = await pool.request()
                .query('select * from Employee')
            console.log("Result from db : ",result)
        } catch (error) {
            throw error
        }
    }

    dbConnect()

    await server.start()
    console.log(`Server is running on port ${server.info.uri}`)
}

process.on('unhandledRejection', (error) => {
    console.log("Error in rejection : ", error)
    process.exit(1)
})

init()

function vivo(arg0: string, vivo: any, arg2: string, VIVO: any, arg4: string) {
    throw new Error("Function not implemented.")
}


function VIVO(arg0: string, vivo: any, arg2: string, VIVO: any, arg4: string) {
    throw new Error("Function not implemented.")
}
