import { post } from "@apiType/announcement"
import { Request, Response } from "express"
import { getPost, setPost } from ".."

const editstatusOnApproval = (req: Request, res: Response) => {
    const postId = req.body.postId
    const status = req.body.status
    const isapprove = req.body.isapprove
    let editstatusA: post | null = null
    const newData = getPost().map((post) => {
        if (post.postId == postId) {
            post.status = status
            post.isApprove = isapprove
            editstatusA = post
        }
        return post
    })
    setPost(newData)
    // console.log(newData);
    res.send(editstatusA)
}

export default editstatusOnApproval
