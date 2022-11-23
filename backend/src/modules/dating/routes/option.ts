import { PrismaClient } from "@prisma/client"
import express, { Request, Response } from "express"
import { verifyUser } from "../../backendService/middleware/verifyUser"

const optionRoutes = express()
const prisma = new PrismaClient()

optionRoutes.get("/", (_, res) => {
    return res.send("Dating Module Option page API")
})

// Get all faculty From user profile
optionRoutes.get("/getFaculty", verifyUser, async (req: Request, res: Response) => {
    try {
        const allFacultyDB = await prisma.faculty.findMany()
        return res.send(allFacultyDB)
    } catch (err) {
        return res.status(404).send("Faculty no found")
    }
})

// Get the previous option
optionRoutes.get("/getOption", verifyUser, async (req: Request, res: Response) => {
    // Put Thitipa's code here
})

// Set the option
optionRoutes.post("/setOption", verifyUser, async (req: Request, res: Response) => {
    // Put Thitipa's code here
})

// Update the option
optionRoutes.put("/updateOption", verifyUser, async (req: Request, res: Response) => {
    // Put Thitipa's code here
})

export default optionRoutes
