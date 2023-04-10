import { NextFunction, Request, Response } from "express"
import { blueBright } from 'console-log-colors';


export const passOnlyUserMw = (req: Request, res: Response, next: NextFunction) => {
    console.log(blueBright("passOnlyUserMw middleware runs"))
    if (!res.locals.sub) {
        // console.log("It's not a user")
        return res.sendStatus(401)
    }
    // console.log("It's a user")
    return next()
}