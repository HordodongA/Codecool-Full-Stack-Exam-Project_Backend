import dotenv from "dotenv"
dotenv.config()

import { env } from "./utilities/envParser"
import mongoose from "mongoose"
import app from "./app"


mongoose.connect(env.MONGO_DB_URL)
  .then(() => console.log("Landlord Database connected."))
  .catch((error) => console.log(error))


app.listen(env.PORT, () => {
  console.log(`⚡️[server]: Landlord Server is running at http://localhost:${env.PORT}`)
})
