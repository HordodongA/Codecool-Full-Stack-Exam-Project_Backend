import dotenv from 'dotenv'
dotenv.config()
import express, { Express } from 'express'
import cors from 'cors'
import { authenticateRequestMw } from './middlewares/authenticateRequest'
// import routes
import login from "./routes/login"
import user from "./routes/user"

const app: Express = express()

// middleware functions
app.use(cors())
app.use(express.json())
app.use(authenticateRequestMw)

// route listeners
app.use('/api/login', login)
app.use('/api/user', user)


export default app