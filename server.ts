import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose"
import { greenBright } from 'console-log-colors';
import env from "./utilities/envParser"

import app from "./app"

// connect to database
mongoose.connect(env.MONGO_DB_URL)
  .then(() => console.log(greenBright(" 📀 Landlord Database is connected")))
  .catch((error) => console.log("Mongoose connection error: " , error))

app.listen(env.PORT, () => {
  console.log(greenBright(`⚡️ Landlord Server is running at http://localhost:${env.PORT}`))
})
