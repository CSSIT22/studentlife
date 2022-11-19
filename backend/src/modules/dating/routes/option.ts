import { PrismaClient } from "@prisma/client"
import express, { Request, Response } from "express"
import { verifyUser } from "../../backendService/middleware/verifyUser"

const optionRoutes = express()
const prisma = new PrismaClient()

optionRoutes.get("/", (_, res) => {
    return res.send("Dating Module Option page API")
})

optionRoutes.get("/getOption", verifyUser, async (req: Request, res: Response) => {
    // Put Thitipa's code here
})

optionRoutes.post("/setOption", verifyUser, async (req: Request, res: Response) => {
    // Put Thitipa's code here
})

optionRoutes.put("/updateOption", verifyUser, async (req: Request, res: Response) => {
    // Put Thitipa's code here
})

export default optionRoutes
