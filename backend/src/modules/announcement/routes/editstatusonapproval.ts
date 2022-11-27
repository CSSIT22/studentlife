import { post } from "@apiType/announcement"
import { Request, Response } from "express"
import { getPost, setPost } from ".."

const editstatusOnApproval = async (req: Request, res: Response) => {
    const postId = req.body.postId
    const status = req.body.status
    const isapprove = req.body.isapprove
    const prisma = res.prisma

    try {
        if (status == "Approve") {
            const editstatus = await prisma.announcement.update({
                where:{
                    postId: postId
                },
                data:{
                    isApprove: true,
                    annPost:{
                        update:{
                            status: "Approve"
                        }
                    }
                }
            })
        }
        else if(status == "Disapprove"){
            const editstatus = await prisma.announcement.update({
                where:{
                    postId: postId
                },
                data:{
                    annPost:{
                        update:{
                            status: "Disapprove"
                        }
                    }
                }
            })

        }
    } catch (err: any) {
        console.log(err)
        res.status(404).send("Can not edit status post")
    }

    // let editstatusA: post | null = null
    // const newData = getPost().map((post) => {
    //     if (post.postId == postId) {
    //         post.status = status
    //         post.isApprove = isapprove
    //         editstatusA = post
    //     }
    //     return post
    // })
    // setPost(newData)
    // // console.log(newData);
    // res.send(editstatusA)
}

export default editstatusOnApproval
