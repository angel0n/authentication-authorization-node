import express from 'express'
import cors from 'cors'
import { RuleRouters } from './routers/RuleRouters'
import { UserRouters } from './routers/UserRouters'

const app = express()

app.use(cors())
app.use(express.json())

app.use(new RuleRouters().routers)
app.use(new UserRouters().routers)

export { app }