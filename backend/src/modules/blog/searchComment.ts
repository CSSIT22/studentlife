import { Request, Response } from "express"

const searchComment = async (req: Request, res: Response) => {
    const prisma = res.prisma

    try {
        // const post = await prisma.student_Post.findFirstOrThrow({ where: { postId: req.params.postId }, include: { postOwner: true, files: true, studentsReacted:true } })
        // return res.send(post)
        const posts = await prisma.post_Comment.findMany({
            select: {
                commentId: true,
                userId:true,
                comment:true,
                commenter: {
                    select:{fName:true, lName:true, userId:true}
                }
            },
            take: 20,
            orderBy: { cmTime: "asc" },
            where:{
                postId: req.params.postId
            },
        })
    } catch (error) {
        return res.status(404).send("Post not found")
    }
}

export default searchComment
