import { Request, Response } from "express"
// get post from Student_+
const getStudentPost = async (req: Request, res: Response) => {
    try {
        const { prisma } = res
        var i = 0
        const getStudentP = await prisma.student_Post.findMany({
            take: 20,
            skip: i,
            orderBy: { score: "desc" },
            include: {
                postOwner: true,
            },
        })
        i += 20
        res.send(getStudentP)
    } catch (error) {}
}

export default getStudentPost
