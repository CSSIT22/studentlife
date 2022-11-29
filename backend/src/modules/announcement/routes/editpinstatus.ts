import { post } from "@apiType/announcement"
import { Request, Response } from "express"
import { getPost, setPost } from ".."

const editPinStatus = async (req: Request, res: Response) => {
    const postId = req.body.postId
    const pinStatus = req.body.pinStatus
    const prisma = res.prisma

    try{
        const updatepin = await prisma.announcement_Pin.updateMany({
            where:{
                userId: req.user?.userId,
                postId: postId
            },
            data:{
                status: pinStatus
            }

        })
        res.send(updatepin)
        // const updatepin = await prisma.announcement.update({
        //     where:{
        //         postId:postId
        //     },
        //     data:{
        //         annPin:{
        //             where:{
        //                 userId: req.user?.userId,
        //             },
        //             update:{
        //                 status: pinStatus
        //             }
        //         }
        //     }
        // })
    }
    catch(err: any){
        // res.send(err)
        res.status(404).send(err)
    }
    // let editpinStatus: post | null = null
    // const newData = getPost().map((post) => {
    //     if (post.postId == postId) {
    //         post.pinStatus = pinStatus
    //         editpinStatus = post
    //     }
    //     return post
    // })
    // setPost(newData)
    // res.send(editpinStatus)
}
export default editPinStatus
