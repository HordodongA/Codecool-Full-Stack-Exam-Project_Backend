import dotenv from "dotenv"
dotenv.config()
import { env } from "./utilities/envParser"
import { greenBright } from 'console-log-colors';

import app from "./app"


app.listen(env.PORT, () => {
  console.log(greenBright(`⚡️ Landlord Server is running at http://localhost:${env.PORT}`))
})
