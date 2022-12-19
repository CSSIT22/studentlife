import express from "express"
import { verifyUser } from "./../backendService/middleware/verifyUser"
import { PrismaClient } from "@prisma/client"

import addNewCard from "./routes/Post/addNewCard"
import createQRPayment from "./routes/Post/createQRPayment"

const prisma = new PrismaClient()

const transactionRoutes = express()
transactionRoutes.use(express.json())

transactionRoutes.post("/Method/CCtokens/New", addNewCard)
transactionRoutes.post("/QRpayment", createQRPayment)

export default transactionRoutes
