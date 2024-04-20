import "reflect-metadata"
import { DataSource } from "typeorm"
import { envs } from "../schemas/envSchema"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: envs.DATABASE_HOST,
    port: envs.DATABASE_PORT,
    username: envs.DATABASE_USER,
    password: envs.DATABASE_PASSWORD,
    database: envs.DATABASE_NAME,
    synchronize: false,
    logging: false,
    entities: [`src/database/entities/*.${envs.AMBIENTE == "develop" ? "ts" : "js"}`],
    migrations: [`src/database/migrations/*.${envs.AMBIENTE == "develop" ? "ts" : "js"}`],
    subscribers: [`src/database/subscribers/*.${envs.AMBIENTE == "develop" ? "ts" : "js"}`],
})