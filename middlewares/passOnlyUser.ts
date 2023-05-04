import { NextFunction, Request, Response } from "express"
import { blueBright } from 'console-log-colors';


const passOnlyUserMw = (req: Request, res: Response, next: NextFunction) => {
    console.log(blueBright("passOnlyUserMw middleware runs"))
    if (!res.locals.sub) {
        return res.sendStatus(401)
    }
    return next()
}

export default passOnlyUserMw