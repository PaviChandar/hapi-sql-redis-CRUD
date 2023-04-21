import convict from "convict"

const config: any = convict( 
    {
        db: {
            server: {
                doc: 'Database host',
			    format: '*',
			    default: 'localhost',
			    env: 'server',
            },
            port: {
                doc: 'DB port',
                format: Number,
                default: 1433,
                env: 'port',
            },
            database: {
                doc: 'Database name',
                format: String,
                default: 'Employee',
                env: 'database',
            },
            user: {
                doc: ' username',
                format: String,
                default: 'sa',
                env: 'user',
            },
            password: {
                doc: 'database password',
                format: String,
                default: 'Aspire@123',
                env: 'password',
            },
            options: {
                trustServerCertificate: {
                    doc: 'options',
                    format: Boolean,
                    default: true,
                }
            }
        },
        hapi: {
            host: {
                doc:'localhost',
                format: String,
                default: 'localhost'
            },
            port: {
                doc:'port to bind',
                format: 'port',
                default: 4000
            }
        }
    }
)

export const hapiPort = config.get('hapi.port')
export const hapiHost = config.get('hapi.host')
config.loadFile('.env')

// const dbport = config.get('port')
// console.log("dbport : ", dbport)
// const dbUser = config.get('user')
// const dbpassword = config.get('password')
// const dbServer = config.get('server')
// const db = config.get('db.name')

// export const dbConfig = { 
//     user: dbUser, 
//     password: dbpassword, 
//     port: dbport,
//     server: dbServer,
//     database: db,
//     options: {
//         trustServerCertificate: true
//     }
// }

export default config




