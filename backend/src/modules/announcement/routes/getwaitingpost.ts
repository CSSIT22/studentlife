import { Request, Response } from "express"
import { getPost } from ".."
import { post } from "../../../../../types/announcement"

const getWaitingPost = async (req: Request, res: Response) => {
    // const id = req.params.id
    const prisma = res.prisma
    try {
        // let selectedposts: post[] = []
        const waitingpost = await prisma.announcement.findMany({
            where: {
                annPost: {
                    status: "Waiting for Approve",
                },
            },
            select: {
                postId: true,
                userId: true,
                annCreator: {
                    select: {
                        fName: true,
                        lName: true,
                    },
                },
                annLanguage: {
                    where: {
                        languageId: 1000,
                    },
                    select: {
                        annTopic: true,
                    },
                },
            },
        })
        // console.log(waitingpost)
        // console.log(waitingpost.length)
        // console.log(waitingpost[0].annLanguage)
        // console.log(waitingpost[0].annCreator)
        res.send(waitingpost)

        // const  selectedpostid = await prisma.announcement_Post.findMany({
        //     where:{
        //         status: "Waiting for Approve"
        //     },
        //     select:{
        //         postId: true
        //     }
        // })
        // console.log(selectedpostid)
        // console.log(selectedpostid.length)
        // let allpostidandtopic =[]

        // for(let i=0;i< selectedpostid.length;i++){
        //     const postidandtopic = await prisma.post_To_Language.findMany({
        //         where:{
        //             postId: selectedpostid[i].postId,
        //             languageId : 1000
        //         },
        //         select:{
        //             postId: true,
        //             annTopic: true
        //         }
        //     })
        //     for(let i=0;i<postidandtopic.length;i++){
        //         allpostidandtopic.push(postidandtopic[i])
        //     }
        // }
        // console.log(allpostidandtopic)

        //     getPost().forEach((post) => {
        //         if (post.status == "waiting") {
        //             selectedposts.push(post)
        //         }
        //     })
        //     if (selectedposts != null) {
        //         // console.log(selectedposts)
        //         return res.send(selectedposts)
        //     }
        //     return res.status(404).send("Post not found")
    } catch (err) {
        res.status(400).send("Error find waitingpost")
    }

    // let selectedposts: post[] = []

    //     getPost().forEach((post) => {
    //         if (post.status == "waiting") {
    //             selectedposts.push(post)
    //         }
    //     })
    //     if (selectedposts != null) {
    //         // console.log(selectedposts)
    //         return res.send(selectedposts)
    //     }
    //     return res.status(404).send("Post not found")
}

export default getWaitingPost
