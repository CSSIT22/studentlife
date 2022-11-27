import { post, post_to_language } from "@apiType/announcement"
import e, { Request, Response } from "express"
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
        // console.log("HI")
        // res.send(allLang)
        // console.log(req.body)
        // console.log(allLang);

        const newTargetUser = await prisma.announcement_Filter.findFirst({
            where: {
                filterType: targetType,
                value: targetValue,
            },
            select: {
                filterId: true,
            },
        })
        const existLang = await prisma.post_To_Language.findMany({
            where: {
                postId: postId,
            },
            select: {
                postId: true,
                languageId: true,
            },
        })

        const updateL = await prisma.post_To_Language.update({
            where: {
                postId_languageId: {
                    languageId: 1000,
                    postId: postId,
                },
            },
            data: {
                annTopic: topic,
                annDetail: detail,
            },
        })
        // console.log(existLang);
        const morelangExist = existLang.filter((el) => el.languageId != 1000)
        const morelangNew = allLang.filter((el) => el.languageId != 1000)
        // console.log(morelangExist)
        // console.log(morelangNew)
        let checkLang: { languageId: number; found: boolean }[] = []
        morelangExist.forEach((el) => {
            checkLang.push({ languageId: el.languageId, found: false })
        })
        // console.log(checkLang);
        morelangExist.forEach((t1) => {
            morelangNew.forEach((t2) => {
                if (t1.languageId == t2.languageId) {
                    checkLang.map((c) => {
                        if (t1.languageId == c.languageId) {
                            c.found = true
                        }
                    })
                }
            })
        })
        console.log(checkLang)
        if (morelangExist.length == morelangNew.length) {
            // console.log(checkLang);
            morelangNew.forEach(async (el) => {
                let found = false
                // old Thai Korea
                // new Thai Japan

                for (let i = 0; i < morelangExist.length; i++) {
                    if (morelangExist[i].languageId == el.languageId) {
                        found = true
                        break
                    }
                }
                if (found) {
                    const update = await prisma.post_To_Language.update({
                        where: {
                            postId_languageId: {
                                languageId: el.languageId,
                                postId: postId,
                            },
                        },
                        data: {
                            annTopic: el.annTopic,
                            annDetail: el.annDetail,
                        },
                    })
                } else {
                    const newLang = await prisma.post_To_Language.create({
                        data: {
                            languageId: el.languageId,
                            annTopic: el.annTopic,
                            annDetail: el.annDetail,
                            postId: morelangExist[0].postId,
                        },
                    })
                    checkLang.forEach(async (e) => {
                        if (e.found == false) {
                            const dd = await prisma.post_To_Language.delete({
                                where: {
                                    postId_languageId: {
                                        languageId: e.languageId,
                                        postId: morelangExist[0].postId,
                                    },
                                },
                            })
                        }
                    })
                }
            })
        } else if(morelangNew.length > morelangExist.length){
            
        }
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
