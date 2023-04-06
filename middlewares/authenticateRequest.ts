import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { env } from "../utilities/envParser"
import { PayloadType } from "../routes/login"


export const authenticateRequest = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization as string
    // if(!token) {res.sendStatus(400)}
    try {
        const decodedToken = jwt.verify(token, env.JWT_SECRET_KEY) as PayloadType
        res.locals.sub = decodedToken.sub
        next()
    } catch (err) {
        console.log(err)
        return res.sendStatus(403)
    }
}

// ? 11.es sor: as PayloadSchema-- Itt is safeParse-olnom kéne? Kell itt a type?
// ? Itt dobjam vissza a requestet vagy az endpointon?
// ? 9-es sor: inkább ez vagy inkább a 14-es sor?