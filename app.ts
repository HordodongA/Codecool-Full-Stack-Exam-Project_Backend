import dotenv from 'dotenv'
dotenv.config()
import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import { env } from './utilities/envParser'

// import routes

const app: Express = express()

app.use(cors())
app.use(express.json())

// routes


export default app