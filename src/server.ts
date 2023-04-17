import { Server } from "@hapi/hapi"
import routes from "./routes"

export const init = async () => {
    const server: Server = new Server({
        port: 4000,
        host: "localhost",
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
