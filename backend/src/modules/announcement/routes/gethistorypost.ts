import { post } from "@apiType/announcement";
import { Request, Response } from "express";
import { getPost } from "..";

const getHistoryPost = (req: Request, res: Response) => {
    const id = req.params.id
    let selectedposts: post[] = []
    getPost().forEach((post) => {
        if(post.userId == id){
            selectedposts.push(post)
        }
    })
    if (selectedposts != null){
        // console.log(selectedposts)
        return res.send(selectedposts)
    }
    return res.status(404).send("Post not found")


}

export default getHistoryPost