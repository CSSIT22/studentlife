import { Request, Response } from "express"
import { PostTextBox, Structure,postes } from ".."

const searchPost = (req:Request, res:Response) => {
    const postId = req.params.postId
    let selectedPost: Structure | null = null
    postes.forEach((post) => {
        if (post.postId == postId) {
            selectedPost = post
        }
    })
    if (selectedPost != null) {
        return res.send(selectedPost)
    }
    return res.status(404).send("Post not found")
}

export default searchPost