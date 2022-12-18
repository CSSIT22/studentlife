import { Request, Response } from "express"

// get post from Student_Profile
const getStudentPostNoi = async (req: Request, res: Response) => {
    try {
        const { prisma } = res
        const getStudentP = await prisma.student_Post.findMany({
            take: 20,
            orderBy: { score: "desc" },
            include: {
                postOwner: {
                    select: {
                        userId: true,
                        fName: true,
                        lName: true,
                    },
                },
            },
        })
        res.send(getStudentP)
    } catch (error) {
        res.status(400).send("Error: can not get post in getStudentPostNoi.ts")
    }
}

export default getStudentPostNoi
