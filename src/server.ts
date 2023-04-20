import { Server } from "@hapi/hapi"
import routes from "./routes"
// import{ hapiPort, hapiHost } from "./config/config"

export const init = async () => {

    const server: Server = new Server({
        port: 4000,
        host: 'localhost',
    })

    routes(server)

    await server.start()
    console.log(`Server is running on port ${server.info.uri}`)
}

process.on('unhandledRejection', (error) => {
    console.log("Error in rejection : ", error)
    process.exit(1)
})

init()

// console.log(db);
// console.log(dbUser);
// console.log(dbpassword);
// console.log(dbport);
// console.log(dbhost);