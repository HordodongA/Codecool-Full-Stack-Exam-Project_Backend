import { Request, Response, NextFunction } from "express"
import { blueBright } from 'console-log-colors';


type Params = string[]

const filterMethodsMw = (allowedMethodsArray: Params) => (req: Request, res: Response, next: NextFunction) => {
    // console.log(blueBright("filterMethodsMw middleware runs"))
    if (allowedMethodsArray.includes(req.method)) {
        return next()
    } else {
        return res.sendStatus(405)
    }
}

export default filterMethodsMw