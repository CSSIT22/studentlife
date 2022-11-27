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
        // update ENG
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
                post:{
                    update:{
                        annExpired:new Date(expiredpost),
                        annCreated:new Date(),
                        filterId:newTargetUser?.filterId
                    }
                }
            },
        })

        // console.log(existLang);
        const morelangExist = existLang.filter((el) => el.languageId != 1000)
        const morelangNew = allLang.filter((el) => el.languageId != 1000)
        // console.log(morelangExist)
        // console.log(morelangNew)

        //for old lang
        let checkLang: { languageId: number; found: boolean }[] = []
        morelangExist.forEach((el) => {
            checkLang.push({ languageId: el.languageId, found: false })
        })
        // for old lang
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

        //for new lang
        let checknewlang: { languageId: number; found: boolean; topic: string; detail: string }[] = []
        morelangNew.forEach((el) => {
            checknewlang.push({ languageId: el.languageId, found: false, topic: el.annTopic, detail: el.annDetail })
        })
        // for new lang
        morelangNew.forEach((t1) => {
            morelangExist.forEach((t2) => {
                if (t1.languageId == t2.languageId) {
                    checknewlang.map((e) => {
                        if (t1.languageId == e.languageId) {
                            e.found = true
                        }
                    })
                }
            })
        })

        // console.log(checkLang)
        // console.log(checknewlang)

        // update other lang
        checknewlang.forEach(async (el) => {
            if (el.found == false) {
                const add = await prisma.post_To_Language.create({
                    data: {
                        languageId: el.languageId,
                        annTopic: el.topic,
                        annDetail: el.detail,
                        postId: postId,
                    },
                })
            }
        })
        checkLang.forEach(async (el) => {
            if (el.found == false) {
                const dd = await prisma.post_To_Language.delete({
                    where: {
                        postId_languageId: {
                            languageId: el.languageId,
                            postId: postId,
                        },
                    },
                })
            }
        })
        res.status(200)
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
