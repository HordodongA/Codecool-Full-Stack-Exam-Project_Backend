import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { blueBright } from 'console-log-colors';
import { env } from "../utilities/envParser"
import { PayloadSchema } from "../routes/login"
import { safeParserFc } from "../utilities/safeParser"


export const authenticateRequestMw = (req: Request, res: Response, next: NextFunction) => {
    console.log(blueBright("authenticateRequestMw middleware runs"))
    const token = req.headers.authorization as string
    if (!token) return next()
    try {
        const decodedToken = jwt.verify(token, env.JWT_SECRET_KEY)
        const result = safeParserFc(PayloadSchema, decodedToken)
        if (!result) { return res.sendStatus(400) }
        res.locals.sub = result.sub
        return next()
    } catch (error) {
        console.log(error)
        next()
    }
}
