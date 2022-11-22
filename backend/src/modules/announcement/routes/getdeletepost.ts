import { Request, Response } from "express"
import { getPost } from ".."
import { post } from "../../../../../types/announcement"

const getDeletePost = (req: Request, res: Response) => {
    // const prisma = res.prisma
    const id = req.user?.userId
    // console.log(id)

    let selectedposts: post[] = []
    getPost().forEach((post) => {
        if (post.status == "delete" && post.userId == id) {
            selectedposts.push(post)
        }
    })
    if (selectedposts != null) {
        // console.log(selectedposts)
        return res.send(selectedposts)
    }
    return res.status(404).send("Post not found")
}

export default getDeletePost
