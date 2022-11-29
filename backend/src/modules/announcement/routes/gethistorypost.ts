import { getSessionIdsByUserIds } from './../../backendService/socketstore/store';
import { post } from "@apiType/announcement"
import { Request, Response } from "express"
import { getPost } from ".."

const getHistoryPost = async (req: Request, res: Response) => {
    const id = req.user?.userId
    const prisma = res.prisma
    let selectedposts: post[] = []
    try{
        const historypage = await prisma.announcement.findMany({
           where: {
            userId: req.user?.userId || ""
           },
           select:{
             postId:true,
             userId:true,
             annLanguage:{
                orderBy:{
                    languageId : 'asc'
                },
                select:{
                    languageId:true,
                    annTopic:true,
                    annDetail:true
                }
             },
             annPost:{
                select:{
                    status:true
                }
             },
             annCreator:{
                select:{
                    fName:true,
                    lName:true
                }
             }
           },
        })
        res.send(historypage)
        // console.log(historypage);
        
    }catch(err){
        res.status(404).send("Post on history not found")
    }
    // getPost().forEach((post) => {
    //     if (post.userId == id) {
    //         selectedposts.push(post)
    //     }
    // })
    // if (selectedposts != null) {
        // console.log(selectedposts)
        // return res.send(selectedposts)
    // }
    // return res.status(404).send("Post on history not found")
}

export default getHistoryPost
