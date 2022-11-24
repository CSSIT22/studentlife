import { Request, Response } from "express"

const getProfile = async (req: Request, res: Response) => {
    try {
        const { prisma } = res
        const userId = req.params["id"]
        const profile = await prisma.user_Profile.findFirstOrThrow({ where: { userId }, select: { image: true } })
        res.end(profile.image)
    } catch (err) {
        res.status(400).send("Error find image")
    }
}

export default getProfile
