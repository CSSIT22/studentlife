import { PrismaClient } from "@prisma/client"
import express, { Request, Response } from "express"
import { verifyUser } from "../../backendService/middleware/verifyUser"

const matchesRoutes = express()
const prisma = new PrismaClient()

matchesRoutes.get("/", (_, res) => {
    return res.send("Dating Module Matches page API")
})

// Get matches people from heart history joined with user profile table
matchesRoutes.get("/getMatches", verifyUser, async (req: Request, res: Response) => {
    // Put Songnapha's code here
    try {
        const reqUserId = req.user?.userId
        console.log(reqUserId)
        const hearthistoryDB = await prisma.$queryRawUnsafe<any[]>(
            `SELECT * FROM "Heart_History" h1
        INNER JOIN "Heart_History" h2 ON h2."anotherUserId" = h1."userId" AND h2."userId" = h1."anotherUserId"
        WHERE h1."userId" = $1 AND h1."isSkipped" = false AND h2."isSkipped" = false`,
            reqUserId
        )
        // return res.send(hearthistoryDB)

        const userIds = hearthistoryDB.map((d) => {
            return d.userId
        })

        const user_Profile = await prisma.user_Profile.findMany({
            where: {
                userId: {
                    in: userIds,
                },
            },
        })

        return res.send(user_Profile)
    } catch (err) {
        console.log(err)
        return res.status(404).send("Match not found")
    }
})

export default matchesRoutes
