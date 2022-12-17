import { Request, Response } from "express"
// get post from Student_+
const getStudentPost = async (req: Request, res: Response) => {
    try {
        const { prisma } = res
        const getStudentP = await prisma.student_Post.findMany({
            orderBy: { score: "desc" },
            include: {
                postOwner: true,
            },
        })
        res.send(getStudentP)
    } catch (error) {}
}

export default getStudentPost
