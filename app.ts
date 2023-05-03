import express, { Express } from 'express'
import cors from 'cors'
// import middlewares
import authenticateRequestMw from './middlewares/authenticateRequest'
// import routes
import login from "./routes/login"
import user from "./routes/user"
import health from "./routes/health"
import ready from "./routes/ready"
import docs from "./routes/docs"

const app: Express = express()

// middleware functions
app.use(cors())
app.use(express.json())
app.use(authenticateRequestMw)

// route listeners
app.use('/api/login', login)
app.use('/api/user', user)
app.use('/api/health', health)
app.use('/api/ready', ready)
app.use('/api/docs', docs)


export default app