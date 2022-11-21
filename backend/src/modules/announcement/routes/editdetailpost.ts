import { post } from "@apiType/announcement";
import { Request, Response } from "express";
import { getPost, setPost } from "..";

const editDetailPost = (req:Request,res:Response) => {
    const postId = req.body.postid
    const topic = req.body.topic
    const detail = req.body.detail
    const targetType = req.body.targetType
    const targetValue = req.body.targetValue
    const postAt = req.body.postat
    const expiredpost = req.body.expiredpost
    const addmorelang = req.body.addMoreLang
    let editpost: post | null = null
    const newData = getPost().map((post) => {
        if(post.postId == postId){
            post.topic = topic
            post.detail = detail
            post.targetType = targetType
            post.targetValue = targetValue
            post.postAt = postAt
            post.expiredOfPost = expiredpost
            post.addMoreLang = addmorelang
            editpost = post
        }
        return post
    })
    // console.log(newData);
    setPost(newData)
    // console.log(editpost);
    res.send(editpost)
}

export default editDetailPost