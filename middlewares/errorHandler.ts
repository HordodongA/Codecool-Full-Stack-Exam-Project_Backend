import { Request, Response, NextFunction } from "express"
import { redBright } from "console-log-colors"

const errorHandlerMW = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log("errorHandlerMW middleware runs")

    console.log(redBright("Unexpected error happend"))
    console.log(err.message)
    res.sendStatus(500)
}

export default errorHandlerMW