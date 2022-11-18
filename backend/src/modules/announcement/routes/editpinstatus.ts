import { post } from "@apiType/announcement";
import { Request, Response } from "express";
import { getPost, setPost } from "..";

const editPinStatus = (req:Request,res:Response) =>{
    const postId = req.body.postId
    const pinStatus = req.body.pinStatus
    let editpinStatus:post | null = null
    const newData = getPost().map((post) => {
        if(post.postId == postId){
            post.pinStatus = pinStatus
        }
        editpinStatus = post
        return post
    })
    setPost(newData)
    res.send(editpinStatus);
    
}
export default editPinStatus