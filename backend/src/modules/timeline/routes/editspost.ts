import { Request, Response } from "express"
import { Post, getPost, setPost } from ".."

const editedPost = (req: Request, res: Response) => {
    const id = req.body.id
    const name = req.body.name
    let editedPost: Post | null = null
    const newdata = getPost().map((post) => {
        if (post.id == id) {
            editedPost = { id: id, name: name }
            return { id: id, name: name }
        }
        return post
    })
    setPost(newdata)
    // posts = newdata
    res.send(editedPost)
}

export default editedPost
