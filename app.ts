import express, { Express } from 'express'
import cors from 'cors'
import mongoose from "mongoose"
import { env } from "./utilities/envParser"
import { greenBright } from 'console-log-colors';
// import middlewares
import { authenticateRequestMw } from './middlewares/authenticateRequest'
// import routes
import login from "./routes/login"
import user from "./routes/user"

const app: Express = express()

// connect database
mongoose.connect(env.MONGO_DB_URL)
  .then(() => console.log(greenBright(" 📀 Landlord Database is connected")))
  .catch((error) => console.log(error))

// middleware functions
app.use(cors())
app.use(express.json())
app.use(authenticateRequestMw)

// route listeners
app.use('/api/login', login)
app.use('/api/user', user)


export default app