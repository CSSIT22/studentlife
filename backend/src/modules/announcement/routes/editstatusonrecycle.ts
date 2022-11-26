import { setPost } from ".."
import { getPost } from ".."
import { post } from "@apiType/announcement"
import { Request, Response } from "express"

const editstatusOnRecyclebin = async (req: Request, res: Response) => {
    const postId = req.body.postId
    const prisma = res.prisma
    try{
        const deleteOnDelete = await prisma.announcement_Delete.delete({
            where:{
                postId:postId
            }
        })
        const addOnAnnouncement_post = await prisma.announcement_Post.create({
            data:{
                postId:postId,
                status:"Approve"
            }
        })
        res.send(addOnAnnouncement_post)
    }catch(err){
        res.status(400).send("click again")
    }



    // const isApprove = req.body.isApprove
    // const status = req.body.status
    // let editStatus: post | null = null
    // const newData = getPost().map((post) => {
    //     if (post.postId == postId) {
    //         post.status = "approve"
    //         editStatus = post
    //     }
    //     return post
    // })
    // setPost(newData)
    // res.send(editStatus)
}

export default editstatusOnRecyclebin
