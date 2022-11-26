import { post, post_to_language } from "@apiType/announcement"
import { Request, Response } from "express"
import { getPost, setPost } from ".."

const editDetailPost = async (req: Request, res: Response) => {
    const postId = req.body.postid
    const topic = req.body.topic
    const detail = req.body.detail
    const targetType = req.body.targetType
    const targetValue = req.body.targetValue
    const postAt = req.body.postat
    const expiredpost = req.body.expiredpost
    const addmorelang = req.body.addMoreLang
    const prisma = res.prisma
   
    // เหลือ update morelang
    try {
        let allLang = []
        allLang.push({ languageId: 1000, annTopic: topic, annDetail: detail })
        addmorelang?.map((el: any) => allLang.push({ languageId: el.languageId, annTopic: el.annTopic, annDetail: el.annDetail }))
        console.log(allLang)
        res.send(allLang)
        const newTargetUser = await prisma.announcement_Filter.findFirst({
            where: {
                filterType: targetType,
                value: targetValue,
            },
            select: {
                filterId: true,
            },
        })

        const updatePost = await prisma.announcement.update({
            where: {
                postId: postId,
            },
            data: {
                annCreated: postAt,
                annExpired: expiredpost,
                filterId: newTargetUser?.filterId,
                annLanguage:{
                    updateMany:{
                        where:{
                            languageId:1000
                        },
                        data:{
                            annTopic:topic,
                            annDetail:detail
                        }
                    }
                }
            },
        })
    } catch (err) {
        res.status(400)
    }

    // let editpost: post | null = null
    // const newData = getPost().map((post) => {
    //     if (post.postId == postId) {
    //         post.annTopic = topic
    //         post.annDetail = detail
    //         post.targetType = targetType
    //         post.targetValue = targetValue
    //         post.postAt = postAt
    //         post.expiredOfPost = expiredpost
    //         post.addMoreLang = addmorelang
    //         editpost = post
    //     }
    //     return post
    // })
    // console.log(newData);
    // setPost(newData)
    // console.log(editpost);
    // res.send(editpost)
}

export default editDetailPost
