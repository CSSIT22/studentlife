import { Request, Response } from "express"

const getFriendData = async (req: Request, res: Response) => {
    try {
        const { prisma } = res
        const userId = req.params["id"]
        const profile = await prisma.user_Profile.findUniqueOrThrow({
            where: {
                userId,
            },
            select: {
                studentId: true,
                fName: true,
                lName: true,
                image: true,
                details: {
                    select: {
                        phone: true,
                        sex: true,
                        hobby: true,
                        birth: true,
                        address: true,
                    },
                },
                studentMajor: {
                    select: {
                        majorId: true,
                        facultyId: true,
                    },
                },
            },
        })

        const blocked = await prisma.user_Blocked.findFirst({
            where: {
                userId: req.user?.userId,
                anotherUserId: userId,
            },
        })
        const blockedre = await prisma.user_Blocked.findFirst({
            where: {
                userId: userId,
                anotherUserId: req.user?.userId || "",
            },
        })
        console.log(blocked)
        if (blocked || blockedre) throw new Error("This user is blocked!")

        res.status(200).json({
            user: {
                studentId: profile.studentId,
                fName: profile.fName,
                lName: profile.lName,
                image: profile.image,
                phone: profile.details?.phone,
                sex: profile.details?.sex,
                hobby: profile.details?.hobby,
                birth: profile.details?.birth,
                address: profile.details?.address,
                majorId: profile.studentMajor?.majorId,
                facultyId: profile.studentMajor?.facultyId,
            },
        })
    } catch (err) {
        console.log(err)
        return res.status(400).send("Error")
    }
}

export default getFriendData
