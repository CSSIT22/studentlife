import { PrismaClient } from "@prisma/client"
import express, { Request, Response } from "express"
import { verifyUser } from "../../backendService/middleware/verifyUser"

const verifyEnrollRoutes = express()
const prisma = new PrismaClient()

verifyEnrollRoutes.get("/", (_, res) => {
    return res.send("Dating Module Verify enroll API")
})

verifyEnrollRoutes.get("/getDatingEnroll", verifyUser, async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId
        if (userId == null) {
            return res.send([])
        } else {
            const dating_EnrollDB = await prisma.dating_Enroll.findFirst({
                where: {
                    userId: userId,
                },
            })
            console.log(dating_EnrollDB)
            return res.send(dating_EnrollDB)
        }
    } catch (err) {
        return res.status(404).send("Dating enroll not found")
    }
})

verifyEnrollRoutes.get("/getDatingOptions", verifyUser, async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId
        if (userId == null) {
            return res.send([])
        } else {
            const dating_OptionsDB = await prisma.dating_Options.findFirst({
                where: {
                    userId: userId,
                },
                select: {
                    userId: true
                }
            })
            console.log(dating_OptionsDB)
            return res.send(dating_OptionsDB)
        }
    } catch (err) {
        return res.status(404).send("Dating enroll not found")
    }
})

export default verifyEnrollRoutes
