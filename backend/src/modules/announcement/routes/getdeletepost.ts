import { announcement } from './../../../../../types/announcement/index';
import { Request, Response } from "express"
import { getPost } from ".."
import { post } from "../../../../../types/announcement"

const getDeletePost = async (req: Request, res: Response) => {
    // const prisma = res.prisma
    const id = req.user?.userId
    const prisma = res.prisma
    // console.log(id)
    try {
        const recyclebin = await prisma.announcement_Delete.findMany({
            where:{
                post:{
                    userId:req.user?.userId || ""
                }
            },
            select:{
                deleteAt:true,
                post:{
                    select:{
                        postId:true,
                        annLanguage: {
                            select: {
                                languageId:true,
                                annTopic:true,
                                annDetail:true
                            },
                        },
                        annCreator:{
                            select:{
                                fName:true,
                                lName:true
                            }
                        },
                    }
                }
            }
        })

       
        res.send(recyclebin)
    } catch (err) {
        res.status(404).send("Post on recycle bin not found")
    }

    // let selectedposts: post[] = []
    // getPost().forEach((post) => {
    //     if (post.status == "delete" && post.userId == id) {
    //         selectedposts.push(post)
    //     }
    // })
    // if (selectedposts != null) {
    //     // console.log(selectedposts)
    //     return res.send(selectedposts)
    // }
    // return res.status(404).send("Post on recycle bin not found")
}

export default getDeletePost
