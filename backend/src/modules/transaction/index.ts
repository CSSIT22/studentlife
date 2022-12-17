import express from "express"
import { verifyUser } from "./../backendService/middleware/verifyUser"
// import getUserCard from "./routes/getUserCard"
import { reqCCuser, Transaction } from "@apiType/transaction/transaction"
import { PrismaClient } from "@prisma/client"
import addNewCard from "./routes/addNewCard"
import createPayment from "./routes/createPayment"
const prisma = new PrismaClient()

const transactionRoutes = express()
transactionRoutes.use(express.json())

transactionRoutes.post("/Method/CCtokens/New", addNewCard)
transactionRoutes.post("/payment", createPayment)

export default transactionRoutes
