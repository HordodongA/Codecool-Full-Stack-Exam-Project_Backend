import express, { Express, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { z } from "zod"
// import utility and middleware functions
import { validateRequestFc } from "../middlewares/validateRequest"
import { safeParserFc } from "../utilities/safeParser"
import { env } from "../utilities/envParser"
import { getIdToken } from "../api/googleOauth2"
// import Mongoose models
import { User, UserType } from "../models/user"

// router endpoint: /api/login
const router = express.Router()

if (!env.JWT_SECRET_KEY) throw "Secret Key is required."

// ZOD Schemas and TS Types
const LoginRequestSchema = z.object({
    code: z.string(),
})
type LoginRequestType = z.infer<typeof LoginRequestSchema>

const PayloadSchema = z.object({
    name: z.string(),
    sub: z.string(),
    email: z.string().email(),
    picture: z.string(),
})
type PayloadType = z.infer<typeof PayloadSchema>


router.post("/", validateRequestFc(LoginRequestSchema), async (req: Request, res: Response) => {

    const loginRequest = req.body as LoginRequestType
    const idToken = await getIdToken(loginRequest.code)
    if (!idToken) return res.sendStatus(401)

    const payload: unknown = jwt.decode(idToken)
    const result = safeParserFc(PayloadSchema, payload)
    if (!result) { return res.sendStatus(500) }
    console.log( result)

    const data = result
    // const user = await User.findOne({ sub: data.sub }) as UserType | null

    // if (!user) {
    //     const newUser = await User.create(data) as UserType
    //     const sessionToken = jwt.sign({ data }, env.JWT_SECRET_KEY)
    //     return res.send({ sessionToken })
    // }
    const sessionToken = jwt.sign( JSON.stringify(result) , env.JWT_SECRET_KEY)
    res.send({ sessionToken })
})      // ! Valamiértnem jól kerül be a payload a session tokenbe!!!

export default router