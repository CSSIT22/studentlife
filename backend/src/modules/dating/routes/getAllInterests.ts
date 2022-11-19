import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const getAllInterests = async (req: Request, res: Response) => {
    const allInterestsDB = await prisma.interest.findMany()
    res.send(allInterestsDB)
}

export default getAllInterests
