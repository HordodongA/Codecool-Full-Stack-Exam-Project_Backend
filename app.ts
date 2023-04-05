import dotenv from 'dotenv'
dotenv.config()
import express, { Express, Request, Response } from 'express'
import cors from 'cors'
// import routes
import login from "./routes/login"
import user from "./routes/user"

const app: Express = express()

app.use(cors())
app.use(express.json())

// route listeners
app.use('/api/login', login)
app.use('/api/user', user)


export default app