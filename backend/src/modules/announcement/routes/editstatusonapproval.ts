import axios from "axios"
import { post } from "@apiType/announcement"
import { Request, Response } from "express"

const editstatusOnApproval = async (req: Request, res: Response) => {
    const postId = req.body.postId
    const status = req.body.status
    const isapprove = req.body.isapprove
    const id = req.user?.userId
    const prisma = res.prisma

    try {
        const postuserid = await prisma.announcement.findMany({
            where:{
                postId: postId
            },
            select:{
                userId:true,
                annLanguage: {
                    select:{
                        annTopic: true
                    }
                }
            }
        })
        if (status == "Approve") {
            axios.post("http://localhost:8000/notification/addnotiobject", {
                template: "ANNOUNCEMENT_APPROVED",
                value: [postuserid[0].annLanguage[0].annTopic, ""],
                userId: [postuserid[0].userId],
                module: "ANNOUNCEMENT",
                url: "/announcement/history",
                sender: id,
            })


            const editstatus = await prisma.announcement.update({
                where: {
                    postId: postId,
                },
                data: {
                    isApprove: true,
                    annPost: {
                        update: {
                            status: "Approve",
                        },
                    },
                },
            })
            const addHours = (date: Date): Date => {
                const result = new Date(date)
                result.setHours(result.getHours() + 7)
                return result
            }
            const recordapproval = await prisma.announcement_Approve.create({
                data: {
                    userId: req.user?.userId || "",
                    postId: postId,
                    approveTime: addHours(new Date()),
                },
            })
        } else if (status == "Disapprove") {

            axios.post("http://localhost:8000/notification/addnotiobject", {
                template: "ANNOUNCEMENT_APPROVED",
                value: [postuserid[0].annLanguage[0].annTopic, "doesn't"],
                userId: [postuserid[0].userId],
                module: "ANNOUNCEMENT",
                url: "/announcement/history",
                sender: id,
            })

            const editstatus = await prisma.announcement.update({
                where: {
                    postId: postId,
                },
                data: {
                    annPost: {
                        update: {
                            status: "Disapprove",
                        },
                    },
                },
            })
        }
        res.status(200).send("Edit status on APPROVAL success")
    } catch (err) {
        res.status(400).send(err)
    }
}

export default editstatusOnApproval
