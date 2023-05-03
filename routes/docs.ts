import express, { Request, Response } from "express"
import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import filterMethodsMw from "../middlewares/filterMethods"
import openapi from '../OpenAPI-doc_Landlord.json'

// * router endpoint: /api/docs
const router = express.Router()

const options = {
    apis: ["../*.js"],
    definition: openapi
}
const specs = swaggerJsdoc(options)


// routes
router.all("/", filterMethodsMw(["GET"]))

router.use('/', swaggerUi.serve)
router.get("/", swaggerUi.setup(specs, { explorer: true }))


export default router