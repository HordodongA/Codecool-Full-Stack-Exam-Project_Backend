import express, { Express, Request, Response } from "express"
import { z } from "zod"
// import utility and middleware functions
import { validateRequestFc } from "../middlewares/validateRequest"
import { authenticateRequest } from "../middlewares/authenticateRequest"
// import Mongoose models
import { User, ActivityType, MachineType, AssetType, UserType } from "../models/user"

// * router endpoint: /api/user
const router = express.Router()

// ZOD Schemas and TS Types
const userRequestSchema = z.object({
    sub: z.string(),
    assets: z.object({
        name: z.string().optional(),
        address: z.string().optional(),
        details: z.string().optional(),
        credentials: z.string().optional(),
        notes: z.string().optional(),
        activities: z.object({
            name: z.string().optional(),
            todos: z.string().optional(),
        }).array().optional(),
        machines: z.object({
            name: z.string().optional(),
            type: z.string().optional(),
            unique_id: z.string().optional(),
            service: z.string().optional(),
            todos: z.string().optional(),
        }).array().optional(),
    }).array().optional(),
})
type userRequestType = z.infer<typeof userRequestSchema>



router.get("/", authenticateRequest, async (req: Request, res: Response) => {
    // if (!res.locals.sub) { res.sendStatus(401) }
    const user = await User.findOne({ sub: res.locals.sub }) as UserType | null
    if (!user) { return res.sendStatus(404) }
    res.send(user)
})



router.put("/", authenticateRequest, validateRequestFc(userRequestSchema), async (req: Request, res: Response) => {
    // if (!res.locals.sub) { res.sendStatus(401) }
    const request = req.body as userRequestType
    const updatedUser = await User.findOneAndUpdate({ sub: res.locals.sub }, { $set: { "assets": request.assets } }, { new: true })
    if (!updatedUser) { return res.sendStatus(500) }
    res.send(updatedUser)
})



router.delete("/", authenticateRequest, async (req: Request, res: Response) => {
    // if (!res.locals.sub) { res.sendStatus(401) }
    const deletedUser = await User.findOneAndDelete({ sub: res.locals.sub })
    if (!deletedUser) { return res.sendStatus(400) }
    res.sendStatus(200)
})


export default router