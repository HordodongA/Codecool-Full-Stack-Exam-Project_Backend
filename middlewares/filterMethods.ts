import { Request, Response, NextFunction } from "express"
import { blueBright } from 'console-log-colors';


type Params = string[]

const filterMethodsMw = (allowedMethodsArray: Params) => (req: Request, res: Response, next: NextFunction) => {
    console.log(blueBright("filterMethodsMw middleware runs"))
    if (allowedMethodsArray.includes(req.method)) {
        // console.log(allowedMethodsArray)
        // console.log("Allowed method")
        return next()
    } else {
        // console.log("Method not allowed")
        return res.sendStatus(405)
    }
}

export default filterMethodsMw