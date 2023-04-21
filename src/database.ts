import sql from "mssql"
import config from "./config/config"

export const dbServer = new sql.ConnectionPool(config.get('db'))
	.connect()
	.then((res) => {
		console.log('DB is Connected');
		return res;
	})
	.catch((err) => {
		console.log(err);
	})
