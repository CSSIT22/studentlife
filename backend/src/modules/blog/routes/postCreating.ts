import { Request, Response } from "express"
import { Structure, postes, PostTextBox, setPostDetail, getPostDetail } from ".."

const postCreating = (req: Request, res: Response) => {
    const postId = req.body.postId
    const userId = req.body.userId
    const lastEdit = req.body.lastEdit
    const score = req.body.score
    const seen = req.body.seen
    const body = req.body.body

    let postCreate: Structure | null = null
    const postcreated = getPostDetail().map((postes) => {
        if (postes.postId == postId) {
            postCreate = {
                postId: postId,
                userId: userId,
                lastEdit: lastEdit,
                score: score,
                seen: seen,

                body: body,
            }
            return {
                postId: postId,
                userId: userId,
                lastEdit: lastEdit,
                score: score,
                seen: seen,

                body: body,
            }
        }
        return postes
    })
    setPostDetail(postcreated)
    // setPostDetail = postcreated
    console.log(postcreated)
    res.send(postcreated)
}

export default postCreating
