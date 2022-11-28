import { Request, Response } from "express"
import { Structure, postes, PostTextBox, setPostDetail, postTextbodies, getPostDetail } from ".."

const postCreating = (req: Request, res: Response) => {
    const postId = req.body.postId
    const userId = req.body.userId
    const lastEdit = req.body.lastEdit
    const score = req.body.score
    const seen = req.body.seen
    const postOwner = req.body.postOwner
    const postBody = req.body.postBody
    const images = req.body.images
    const vids = req.body.vids
    const studentsReacted = req.body.studentsReacted
    const studentsComment = req.body.studentsComment
    const rePost = req.body.rePost
    const userReported = req.body.userReported
    const postHided = req.body.postHided
    const communityPost = req.body.communityPost

    let postCreate: Structure | null = null
    const postcreated = getPostDetail().map((postes) => {
        if (postes.postId == postId) {
            postCreate = {
                postId: postId,
                userId: userId,
                lastEdit: lastEdit,
                score: score,
                seen: seen,
                postOwner: postOwner,
                postBody: postBody,
                images: images,
                vids: vids,
                studentsReacted: studentsReacted,
                studentsComment: studentsComment,
                rePost: rePost,
                userReported: userReported,
                postHided: postHided,
                communityPost: communityPost,
            }
            return {
                postId: postId,
                userId: userId,
                lastEdit: lastEdit,
                score: score,
                seen: seen,
                postOwner: postOwner,
                postBody: postBody,
                images: images,
                vids: vids,
                studentsReacted: studentsReacted,
                studentsComment: studentsComment,
                rePost: rePost,
                userReported: userReported,
                postHided: postHided,
                communityPost: communityPost,
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
