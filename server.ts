import dotenv from "dotenv"
dotenv.config()
import { env } from "./utilities/envParser"
import mongoose from "mongoose"
import { greenBright } from 'console-log-colors';

import app from "./app"

// connect to database
mongoose.connect(env.MONGO_DB_URL)
  .then(() => console.log(greenBright(" 📀 Landlord Database is connected")))
  .catch((error) => console.log(error))

app.listen(env.PORT, () => {
  console.log(greenBright(`⚡️ Landlord Server is running at http://localhost:${env.PORT}`))
})
