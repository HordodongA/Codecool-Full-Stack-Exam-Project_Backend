import dotenv from "dotenv"
dotenv.config()

import { env } from "./utilities/envParser"
import mongoose from "mongoose"
import app from "./app"
// mongoose.connect(env.MONGO_URL)


app.listen(env.PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${env.PORT}`)
})
