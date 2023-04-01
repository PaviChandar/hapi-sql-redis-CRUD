import { Server } from "@hapi/hapi"
import dbConfig from "./config/dbConfig"
import sql, { pool } from "mssql"
import routes from "./routes"

export const init = async () => {
    const server: Server = new Server({
        port: 4000,
        host: "localhost",
    })

    routes(server)

    const dbConnect = async() => {
        try {
            await sql.connect(dbConfig)
            console.log("DB server connected")
        } catch(error) {
            console.log("error in catch : ", error)
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
