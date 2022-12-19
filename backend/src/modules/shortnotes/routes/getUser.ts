import { Request, Response } from "express"
import { prisma } from "@prisma/client"

const getUser = async (req: Request, res: Response) => {
    try {
        const prisma = res.prisma
        const user = await prisma.user_Profile.findMany({
            select: {
                userId: true,
                studentId: true,
                fName: true,
                lName: true,
            },
        })
        res.send(user)
        //console.log(course)
    } catch (err) {
        res.status(400).send("some error")
    }
}

export default getUser
