// import express, { Request, Response } from "express"
// import swaggerJsdoc from "swagger-jsdoc"
// import swaggerUi from "swagger-ui-express"
// // import utility and middleware functions
// import { filterMethodsMw } from "../middlewares/filterMethods"
// // import data
// import openapi from '../OpenAPI-doc_Landlord.json'

// // * router endpoint: /api/docs
// const router = express.Router()

// // console.log(openapi.tags)
// const options = {
//     apis: ["./routes/*.js"],
//     definition: openapi
// }
// const specs = swaggerJsdoc(options)

// routes
// router.all("/", filterMethodsMw(["GET"]))

// router.get("/", 
//     swaggerUi.serve,
//     swaggerUi.setup(specs, { explorer: true })
// )


// export default router