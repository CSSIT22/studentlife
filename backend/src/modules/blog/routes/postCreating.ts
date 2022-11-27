import { Request, Response } from "express"
import { Post, setPostDetail, postDetail, getPostDetail } from ".."

const postCreating = (req: Request, res: Response) => {
    const postId = req.body.postId
    const text = req.body.text
    let postCreating: Post | null = null
    const postcreated = getPostDetail().map((PostDetail) => {
        if (PostDetail.postId == postId) {
            postCreating = { postId: postId, text: text }
            return { postId: postId, text: text }
        }
        return PostDetail
    })
    setPostDetail(postcreated)
    // setPostDetail = postcreated
    console.log(postcreated)
    res.send(postcreated)
}

export default postCreating
