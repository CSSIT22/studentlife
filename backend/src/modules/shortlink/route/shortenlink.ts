import { Request, Response } from "express"
import { nanoid, customAlphabet } from "nanoid"

const shortenlink = async (req: Request, res: Response) => {
    //async = Does not folow the steps ()
    const body = req.body // Request parameter from user
    const userId = req.user?.userId || "" //Request userID from middleware to know who is using it.
    const customNanoid = customAlphabet ("abcdefghijklmnopqrstuvwxyz", 6) // Create custom nanoid randomizer

    console.log(req.body.originalLink)
    console.log(req.user)
    try {
        const prisma = res.prisma
        const result = await prisma.shortLink.create({
            //await = wait for the database
            data: {
                userId: userId,
                originalLink: body.originalLink,
                shortenLink: customNanoid(),
            },
        })
        console.log(result)
        res.status(200).json({ result: result })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "ERROR", err: error })
    }
}

export default shortenlink
