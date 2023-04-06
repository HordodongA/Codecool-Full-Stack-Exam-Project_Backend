import { NextFunction, Request, Response } from "express"

export const passOnlyUserMw = (req: Request, res: Response, next: NextFunction) => {
    if (!res.locals.sub) { return res.sendStatus(401) }
}