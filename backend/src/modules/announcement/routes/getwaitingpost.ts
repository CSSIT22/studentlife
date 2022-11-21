import { Request, Response } from "express"
import { getPost } from ".."
import { post } from "../../../../../types/announcement"

const getWaitingPost = (req: Request, res: Response) => {
    // const id = req.params.id
    let selectedposts: post[] = []
    getPost().forEach((post) => {
        if (post.status == "waiting") {
            selectedposts.push(post)
        }
    })
    if (selectedposts != null) {
        // console.log(selectedposts)
        return res.send(selectedposts)
    }
    return res.status(404).send("Post not found")
}

export default getWaitingPost