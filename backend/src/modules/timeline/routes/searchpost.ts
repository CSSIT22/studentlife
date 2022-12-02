import { Request, Response } from "express"
import { getPost, Post } from ".."

const searchPost = (req: Request, res: Response) => {
    const id = req.params.id
    let selectedpost: Post | null = null
    getPost().forEach((post) => {
        if (post.id == id) {
            selectedpost = post
        }
    })
    if (selectedpost != null) {
        return res.send(selectedpost)
    }
    return res.status(404).send("Post not found")
}

export default searchPost
