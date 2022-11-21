import { post } from "@apiType/announcement"
import { Request, Response } from "express"
import { getPost, setPost } from ".."

const createPost = (req: Request, res: Response) => {
    const id = req.user?.userId
    const { topic, detail, targetType, targetValue, expiredPost, addmorelang } = req.body
    const newPost = {
        postId: Date.now(),
        userId: req.user?.userId || "",
        lang_id: 1000,
        topic: topic,
        detail: detail,
        sender: "SAMO-SIT",
        status:"waiting",
        pinStatus: false,
        isApprove: false,
        targetType: targetType,
        targetValue: targetValue,
        postAt: new Date(),
        expiredOfPost: expiredPost,
        expiredAfterDelete: new Date(),
        addMoreLang: addmorelang,
    }
    let newData:post[] = [];
    for(let i = 0;i < getPost().length;i++){
        newData.push(getPost()[i])
    }
    newData.push(newPost)
    // setPost([getPost().map((el) => (el)), newPost])
    // console.log(newData);
    setPost(newData)
    return res.send(newPost)
    // console.log(newData);
    
    // setPost(newData)
}

export default createPost;
