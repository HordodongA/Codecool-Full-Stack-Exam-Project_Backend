import express, { Express } from 'express'
import cors from 'cors'
import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
// import middlewares
import { authenticateRequestMw } from './middlewares/authenticateRequest'
// import data
import openapi from './OpenAPI-doc_Landlord.json'
// import routes
import login from "./routes/login"
import user from "./routes/user"
import health from "./routes/health"
import ready from "./routes/ready"
// import docs from "./routes/docs"

const app: Express = express()

//configure serving api docs
const options = {
    apis: ["./routes/*.js"],
    definition: openapi
}
const specs = swaggerJsdoc(options)

// middleware functions
app.use(cors())
app.use(express.json())
app.use(authenticateRequestMw)

// route listeners
app.use('/api/login', login)
app.use('/api/user', user)
app.use('/api/health', health)
app.use('/api/ready', ready)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }))


export default app