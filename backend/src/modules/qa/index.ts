import express, { Request, Response } from "express"
import { verifyUser } from "../backendService/middleware/verifyUser"
import getQuestions from "./routes/getQuestions"

const qaRoutes = express()

qaRoutes.get("/", getQuestions)

export default qaRoutes
