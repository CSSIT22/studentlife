import { Request, Response } from "express"
import { Prisma } from "@prisma/client"
const blockuser = async (req: Request, res: Response) => {
    try {
        const { prisma } = res
        const userId = req.user?.userId || ""
        // Insert a new record into the userblock table to reflect that the user has been blocked
        await prisma.user_Blocked.create({
            data: {
                userId: req.body.userId, // the ID of the user who is blocking another user
                anotherUserId: req.body.anotherUserId, // the ID of the user being blocked
            },
        })

        return res.redirect(`${process.env.SUCCESS_REDIRECT_URL}/NotFound`)
    } catch (err) {
        console.error(err)
        res.status(500).send({
            message: "Error occured while trying to block user",
        })
    }
}

export default blockuser
