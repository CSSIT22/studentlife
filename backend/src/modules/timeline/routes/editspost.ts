import { Request, Response } from "express"
import { Post, getPost, setPost } from ".."

const editedPost = (req: Request, res: Response) => {
    const id = req.body.id
    const name = req.body.name
    const dateTime = req.body.dateTime
    const message = req.body.message
    const likes = req.body.likes
    const comments = req.body.comments
    const shares = req.body.shares
    const avatar = req.body.avatar
    const media = req.body.media

    let editedPost: Post | null = null
    const newdata = getPost().map((post) => {
        if (post.id == id) {
            editedPost = {
                id: id,
                name: name,
                dateTime: dateTime,
                message: message,
                likes: likes,
                comments: comments,
                shares: shares,
                avatar: avatar,
                media: media,
            }
            return {
                id: id,
                name: name,
                dateTime: dateTime,
                message: message,
                likes: likes,
                comments: comments,
                shares: shares,
                avatar: avatar,
                media: media,
            }
        }
        return post
    })
    setPost(newdata)
    // posts = newdata
    res.send(editedPost)
}

export default editedPost
