import axios, { AxiosResponse } from "axios"
import { z } from "zod"
import { env } from "../utilities/envParser"

const url = "https://oauth2.googleapis.com/token"

const ResponseSchema = z.object({
    id_token: z.string(),
    // access_token: z.string(),
    // refresh_token: z.string(),
    // expires_in: z.number(),
    // scope: z.string(),
    // token_type: z.literal("Bearer")
})
type ResponseType = z.infer<typeof ResponseSchema>


export const getIdToken = async (code: string): Promise<string | null> => {
    try {
        const response: AxiosResponse = await axios.post(url, {
            client_id: env.CLIENT_ID,
            client_secret: env.CLIENT_SECRET,
            redirect_uri: env.REDIRECT_URI,
            code,
            grant_type: "authorization_code"
        })
        const result = ResponseSchema.safeParse(response.data)
        if (result.success === false) {
            console.log("getIDToken safeParse error")
            return null
        }
        return result.data.id_token
    } catch (error) {
        console.log("getIDToken error")
        return null
    }
}
