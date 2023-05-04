import express, { Request, Response } from "express"
import mongoose from "mongoose"
import filterMethodsMw from "../middlewares/filterMethods"

// * router endpoint: /api/ready
const router = express.Router()


// routes
router.all("/", filterMethodsMw(["GET"]))

router.get("/", async (req: Request, res: Response) => {
    // console.log("A request reached /api/ready GET endpoint")
    const state = mongoose.connection.readyState
    if (state === 1) return res.sendStatus(200)
    return res.sendStatus(503)
})

export default router


// Mongoose connection states:
// 0 = disconnected
// 1 = connected
// 2 = connecting
// 3 = disconnecting