import { z } from "zod"

const safeParserFc = <Schema extends z.ZodTypeAny>(schema: Schema, data: unknown): z.infer<Schema> | null => {
    const result = schema.safeParse(data)
    if (result.success === false) {
        console.log(result.error)
        return null
    }
    return result.data
}

export default safeParserFc