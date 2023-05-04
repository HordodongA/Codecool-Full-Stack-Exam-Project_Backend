import express, { Request, Response } from "express"
import { z } from "zod"
import filterMethodsMw from "../middlewares/filterMethods"
import passOnlyUserMw from "../middlewares/passOnlyUser"
import validateRequestMw from "../middlewares/validateRequest"
import { User, UserType } from "../models/user"

// * router endpoint: /api/user
const router = express.Router()

// ZOD Schemas and TS Types
const ActivitySchema = z.object({
    name: z.string(),
    todos: z.string().optional(),
})
const MachineSchema = z.object({
    name: z.string(),
    type: z.string().optional(),
    unique_id: z.string().optional(),
    service: z.string().optional(),
    todos: z.string().optional(),
})
const AssetSchema = z.object({
    name: z.string(),
    address: z.string().optional(),
    details: z.string().optional(),
    credentials: z.string().optional(),
    notes: z.string().optional(),
    activities: ActivitySchema.array().optional(),
    machines: MachineSchema.array().optional(),
})
const userRequestSchema = z.object({
    sub: z.string(),
    assets: AssetSchema.array().optional(),
})
type userRequestType = z.infer<typeof userRequestSchema>


// routes
router.all("/", filterMethodsMw(["GET", "PUT", "DELETE"]), passOnlyUserMw)

router.get("/", async (req: Request, res: Response) => {
    // console.log("A request reached /api/user GET endpoint")
    try {
        const user = await User.findOne({ sub: res.locals.sub }) as UserType | null
        if (!user) { return res.sendStatus(404) }
        res.send(user)
    } catch (error) {
        console.log("Mongoose error")
        return res.sendStatus(503)
    }
})

router.put("/", validateRequestMw(userRequestSchema), async (req: Request, res: Response) => {
    // console.log("A request reached /api/user PUT endpoint")
    try {
        const request = req.body as userRequestType
        const updatedUser = await User.findOneAndUpdate({ sub: res.locals.sub }, { $set: { "assets": request.assets } }, { new: true })
        if (!updatedUser) { return res.sendStatus(404) }
        res.send(updatedUser)
    } catch (error) {
        console.log("Mongoose error")
        return res.sendStatus(503)
    }
})

router.delete("/", async (req: Request, res: Response) => {
    // console.log("A request reached /api/user DELETE endpoint")
    try {
        const deletedUser = await User.findOneAndDelete({ sub: res.locals.sub })
        if (!deletedUser) { return res.sendStatus(404) }
        res.sendStatus(204)
    } catch (error) {
        console.log("Mongoose error")
        return res.sendStatus(503)
    }
})


export default router