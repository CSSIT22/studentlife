import { checkLanguage, checkNewLanguage, existLang, post, post_to_language, post_to_language2 } from "@apiType/announcement"
import e, { Request, Response } from "express"

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

    try {
        let allLang:post_to_language2[] = []
        allLang.push({ languageId: 1000, annTopic: topic, annDetail: detail })
        addmorelang?.map((el: post_to_language2) => allLang.push({ languageId: el.languageId, annTopic: el.annTopic, annDetail: el.annDetail }))

        const newTargetUser = await prisma.announcement_Filter.findFirst({
            where: {
                filterType: targetType,
                value: targetValue,
            },
            select: {
                filterId: true,
            },
        })
        const existLang:existLang[] = await prisma.post_To_Language.findMany({
            where: {
                postId: postId,
            },
            select: {
                postId: true,
                languageId: true,
            },
        })
        const addHours = (date: Date): Date => {
            const result = new Date(date)
            result.setHours(result.getHours() + 7)
            return result
        }
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
                post: {
                    update: {
                        annExpired: new Date(expiredpost),
                        annCreated: addHours(new Date()),
                        filterId: newTargetUser?.filterId,
                    },
                },
            },
        })

        const morelangExist = existLang.filter((el) => el.languageId != 1000)
        const morelangNew:post_to_language2[] = allLang.filter((el) => el.languageId != 1000)

        //for old lang
        let checkLang: checkLanguage[] = []
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
        let checknewlang: checkNewLanguage[] = []
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
        res.status(200).send("Edit post success")
    } catch (err) {
        res.status(400).send(err)
    }
}

export default editDetailPost
