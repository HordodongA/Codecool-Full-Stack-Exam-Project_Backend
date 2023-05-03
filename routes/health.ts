import express, { Request, Response } from "express"
// import utility and middleware functions
import filterMethodsMw from "../middlewares/filterMethods"

// * router endpoint: /api/ready
const router = express.Router()


// routes
router.all("/", filterMethodsMw(["GET"]))

router.get("/", async (req: Request, res: Response) => {
    console.log("A request reached /api/health GET endpoint")
    return res.sendStatus(200)
})


export default router