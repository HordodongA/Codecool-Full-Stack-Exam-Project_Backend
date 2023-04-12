import { Request, Response, NextFunction } from "express"
import { z } from "zod"
import { blueBright } from 'console-log-colors';
import { safeParserFc } from "../utilities/safeParser"


export const validateRequestMw = <Schema extends z.ZodTypeAny>(schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
    console.log(blueBright("validateRequestMw middleware runs"))
    const result = safeParserFc(schema, req.body)
    if (!result) {
        return res.sendStatus(400)
    }
    next()
}