import { Request, Response } from "express"

// get post from Student_Profile
const getStudentPost = async (req: Request, res: Response) => {
    try {
        const { prisma } = res
        const i = parseInt(req.params.i) * 20
        const thisUserId = req.user ? req.user.userId : ""
        const getStudentP = await prisma.student_Post.findMany({
            where: {
                // where does not work
                postOwner: {
                    userFollowing: {
                        every: {
                            userId: thisUserId,
                        },
                    },
                },
            },
            skip: i,
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
        res.status(400).send("Error: can not get post in getStudentPost.ts")
    }
}

export default getStudentPost
