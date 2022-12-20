import { Request, Response } from "express"

// get post from Student_Profile
const getSuggestion = async (req: Request, res: Response) => {
    try {
        const { prisma } = res
        const studentPostCount = await prisma.student_Post.count()
        const skip = Math.floor(Math.random() * studentPostCount) // skip by random number
        const getStudentP = await prisma.student_Post.findMany({
            take: 5,
            skip: skip,
            orderBy: { score: "desc" },
            include: {
                postOwner: {
                    select: {
                        userId: true,
                        fName: true,
                        lName: true,
                        majorId: true,
                    },
                },
            },
        })
        res.send(getStudentP)
    } catch (error) {
        res.status(400).send("Error: can not get post in getStudentPostNoi.ts")
    }
}

export default getSuggestion
