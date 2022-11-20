import { Request, Response } from "express"

const getProfile = async (req: Request, res: Response) => {
    try {
        const { prisma } = res
        const userId = req.params["id"]
        const profile = await prisma.user_Profile.findFirstOrThrow({
            where: { userId },
            select: { studentId: true, fName: true, lName: true, image: true, majorId: true },
        })
        console.log(req.user?.fName)
        res.json(profile)
    } catch (err) {
        res.status(400).send("Error find Profile")
    }

    // try {
    //     const { prisma } = res
    //     const userId = req.params["id"]
    //     const profile = await prisma.user_Profile.findFirstOrThrow({ where: { userId }, select: { image: true } })
    //     res.end(profile.image)
    // } catch (err) {
    //     res.status(400).send("Error find image")
    // }
}

export default getProfile
