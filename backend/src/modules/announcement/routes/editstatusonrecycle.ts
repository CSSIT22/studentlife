import { setPost } from ".."
import { getPost } from ".."
import { post } from "@apiType/announcement"
import { Request, Response } from "express"

const editstatusOnRecyclebin = (req: Request, res: Response) => {
    const postId = req.body.postId
    // const isApprove = req.body.isApprove
    // const status = req.body.status
    let editStatus: post | null = null
    const newData = getPost().map((post) => {
        if (post.postId == postId) {
            post.status = "approve"
            editStatus = post
        }
        return post
    })
    setPost(newData)
    res.send(editStatus)
}

export default editstatusOnRecyclebin
