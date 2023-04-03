import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { env } from "../utilities/envParser"


const authenticateRequest = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization as string
    try {
        const decodedToken =jwt.verify(token, env.JWT_SECRET_KEY)
        // res.locals.sub = decodedToken.user.sub       // -- make token payload type first
        next ()
    } catch (err) {
        console.log(err)
        return res.sendStatus(403)
    }
}
 
module.exports = authenticateRequest

// ! Auth middleware typescriptesítés!!!