import { post } from "@apiType/announcement";
import { Request, Response } from "express";
import { getPost, setPost } from "..";

const editstatusOnHistory = (req:Request,res:Response) => {
    const postId = req.body.postId
    const status = req.body.status
    let editstatusH:post | null = null
    const newData = getPost().map((post) => {
        if(post.postId == postId){
            post.status = status
            editstatusH = post
        }
        return post
    })
    setPost(newData)
    // console.log(newData);
    res.send(editstatusH);
}
export default editstatusOnHistory;