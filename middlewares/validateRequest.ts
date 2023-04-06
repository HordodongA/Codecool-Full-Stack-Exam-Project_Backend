import { Request, Response, NextFunction } from "express"
import { z } from "zod"
import { safeParserFc } from "../utilities/safeParser"

export const validateRequestMw = <Schema extends z.ZodTypeAny> (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
    const result = safeParserFc(schema, req.body)
    if (!result) {
        return res.sendStatus(400)
    }
    next()
}