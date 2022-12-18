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
                        year: true,
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
                year: profile.details?.year,
                address: profile.details?.address,
                majorId: profile.studentMajor?.majorId,
                facultyId: profile.studentMajor?.facultyId,
            },
        })
        console.log(profile)
    } catch (err) {
        return res.redirect(`${process.env.SUCCESS_REDIRECT_URL}/NotFound`)
    }
}

export default getFriendData
