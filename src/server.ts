import { app } from "./app"
import { AppDataSource } from "./database/data-source"
import { envs } from "./schemas/envSchema"

AppDataSource.initialize().then(async () => {
    app.listen(envs.SERVER_PORT,()=>console.log(`Server listening on port ${envs.SERVER_PORT}`))
}).catch(error => console.log(error))