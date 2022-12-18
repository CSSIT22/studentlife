import { Request, Response } from "express"
import { Prisma } from "@prisma/client"
const blockuser = async (req: Request, res: Response) => {
    try {
        console.log("HI")
        const { prisma } = res
        const userId = req.user?.userId || ""
        // Insert a new record into the userblock table to reflect that the user has been blocked
        await prisma.user_Blocked.create({
            data: {
                userId: userId,
                anotherUserId: req.params.id,
            },
        })
        res.send("success")
        //res.redirect(`${process.env.SUCCESS_REDIRECT_URL}/NotFound`)
    } catch (err) {
        console.error(err)
        res.status(500).send({
            err,
        })
    }
}

export default blockuser
