import { post } from "@apiType/announcement"
import { Request, Response } from "express"
import { getPost } from ".."

const getDetailEdit = async (req: Request, res: Response) => {
    // const id = parseInt(req.params.id + "")
    const id = req.params.id
    const prisma = res.prisma

    try {
        const getdetail = await prisma.announcement.findMany({
            where: {
                postId: id,
            },
            select: {
                postId: true,
                // userId: true,
                // filterId: true,
                annFilter: {
                    select: {
                        filterType: true,
                        value: true,
                    },
                },
                annLanguage: {
                    orderBy:{
                        languageId : 'asc'
                    },
                    select: {
                        postId: true,
                        languageId: true,
                        annTopic: true,
                        annDetail: true,
                    },
                },
                annCreator: {
                    select: {
                        fName: true,
                        lName: true,
                    },
                },
                annExpired: true
            },
        })
        res.send(getdetail)
        // console.log(getdetail)
        // console.log(getdetail[0].annCreator)
        // console.log(getdetail[0].annLanguage)

    } catch (err: any) {
        // console.log(err)
        res.status(404).send("Can not get detail")
    }
    // let selectpost: post | null = null
    // getPost().forEach((post) => {
    //     if (post.postId == id) {
    //         selectpost = post
    //     }
    // })
    // if (selectpost != null) {
    //     return res.send(selectpost)
    // }
    // return res.status(404).send("Post detail not found")
}
export default getDetailEdit
