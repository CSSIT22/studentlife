import { Request, Response } from "express"
// get post from Student_+
const getStudentPost = async (req: Request, res: Response) => {
    try {
        const { prisma } = res
        const i = parseInt(req.params.i) * 20
        const getStudentP = await prisma.student_Post.findMany({
            skip: i,
            take: 20,
            orderBy: { score: "desc" },
            include: {
                postOwner: true,
            },
        })
        res.send(getStudentP)
    } catch (error) {
        res.status(400).send("Error: can not get post in getStudentPost.ts")
    }
}

export default getStudentPost
