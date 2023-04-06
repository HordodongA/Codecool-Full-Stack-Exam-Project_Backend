import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { env } from "../utilities/envParser"
import { PayloadSchema } from "../routes/login"
import { safeParserFc } from "../utilities/safeParser"


export const authenticateRequestMw = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization as string
    try {
        const decodedToken = jwt.verify(token, env.JWT_SECRET_KEY)
        const result = safeParserFc(PayloadSchema, decodedToken)
        if (!result) { return res.sendStatus(400) }
        res.locals.sub = result.sub
        next()
    } catch (err) {
        console.log(err)
        next()
    }
}
