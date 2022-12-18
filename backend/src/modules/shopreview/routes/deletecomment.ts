import { prisma } from "@prisma/client"
import { Request, Response } from "express"

const deletecomment = async (req: Request<any>, res: Response<any>) => {
    try {
        const prisma = res.prisma
        const user = req.user?.userId
        await prisma.sReview_Comment_Like.deleteMany({
            
            where:{
                commentId:req.body.commentId
            }
        })
        const sn = await prisma.sReview_Comment.delete({
            where: {
                commentId: req.body.commentId,
            },
            include: {
                userLike: true,
            },
        })
        res.send(sn)
        
    } catch (err) {
        console.log(err)
        console.log("have some error on this delete comment")
        return res.send("have some error on this delete comment")
    }
}

export default deletecomment
