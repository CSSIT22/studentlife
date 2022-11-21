import { post } from "@apiType/announcement"
import { Request, Response } from "express"
import { getPost } from ".."

const getDetail = (req:Request,res:Response) => {
    const id = parseInt(req.params.id+"")
    let selectpost:post | null = null
    getPost().forEach((post) => {
        if(post.postId == id){
            selectpost = post
        }
    })
    if(selectpost != null){
        return res.send([selectpost])
    }
    return res.status(404).send("Post not found")
    
}
export default getDetail