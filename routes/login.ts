import express, { Express, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { z } from "zod"
import getIdToken from "../api/googleOpenId"
import filterMethodsMw from "../middlewares/filterMethods"
import validateRequestMw from "../middlewares/validateRequest"
import safeParserFc from "../utilities/safeParser"
import env from "../utilities/envParser"
if (!env.JWT_SECRET_KEY) throw "Secret Key is required."
import { User, UserType } from "../models/user"


// * router endpoint: /api/login
const router = express.Router()


// ZOD Schemas and TS Types
const LoginRequestSchema = z.object({
    code: z.string(),
})
type LoginRequestType = z.infer<typeof LoginRequestSchema>

export const PayloadSchema = z.object({
    name: z.string(),
    sub: z.string(),
    email: z.string().email(),
    picture: z.string(),
})
export type PayloadType = z.infer<typeof PayloadSchema>


// routes
router.all("/", filterMethodsMw(["POST"]))

router.post("/", validateRequestMw(LoginRequestSchema), async (req: Request, res: Response) => {
    // console.log("A request reached /api/login POST endpoint")
    const loginRequest = req.body as LoginRequestType
    const idToken = await getIdToken(loginRequest.code)
    if (!idToken) return res.sendStatus(401)

    const payload: unknown = jwt.decode(idToken)
    const result = safeParserFc(PayloadSchema, payload)
    if (!result) { return res.sendStatus(503) }

    const user = await User.findOne({ sub: result.sub })
    if (!user) {
        try {
            const newUser = await User.create<UserType>({ sub: result.sub })
            const sessionToken = jwt.sign(result, env.JWT_SECRET_KEY, { expiresIn: "6h" })
            return res.send({ sessionToken })
        } catch (error) {
            console.log("Mongoose error: ", error)
            return res.sendStatus(503)
        }
    }
    const sessionToken = jwt.sign(result, env.JWT_SECRET_KEY, { expiresIn: "6h" })
    res.send({ sessionToken })
})


export default router