import express from "express"
import getHistoryPost from "./routes/gethistorypost"
import getWaitingPost from "./routes/getwaitingpost"
import getDeletePost from "./routes/getdeletepost"
import editPinStatus from "./routes/editpinstatus"
import editstatusOnApproval from "./routes/editstatusonapproval"
import editstatusOnRecyclebin from "./routes/editstatusonrecycle"
import editstatusOnHistory from "./routes/editstausonhistory"
import editDetailPost from "./routes/editdetailpost"
import getDetailEdit from "./routes/getdetailedit"
import getTargetGroup from "./routes/gettargetgroup"
import createPost from "./routes/createpost"
import getTypeTarget from "./routes/gettypetarget"
import getOtherLang from "./routes/getotherlang"
import deleteExpiredPost from "./routes/deleteexpiredpost"

const announcementRoutes = express()

announcementRoutes.use(express.json())

announcementRoutes.get("/getPostOnAnnouncement", async (req, res) => {
    const minute = 1000 * 60
    const hour = minute * 60
    const day = hour * 24
    const date = new Date()
    const currentD = Math.round(date.getTime() / day)
    const prisma = res.prisma

    try {
        const getpostid = await prisma.announcement_Pin.findMany({
            where: {
                userId: req.user?.userId || "",
            },
            select: {
                postId: true,
            },
        })
        let allpost = []
        for (let i = 0; i < getpostid.length; i++) {
            const getpostdetail = await prisma.announcement.findMany({
                where: {
                    postId: getpostid[i].postId,
                    isApprove: true,
                    annPost: {
                        status: "Approve",
                    },
                },
                select: {
                    postId: true,
                    userId: true,
                    annFilter: {
                        select: {
                            filterType: true,
                            value: true,
                        },
                    },
                    annLanguage: {
                        orderBy: {
                            languageId: "asc",
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
                    annExpired: true,
                    annPin: {
                        where: {
                            userId: req.user?.userId,
                        },
                        select: {
                            status: true,
                        },
                    },
                    annApprove: {
                        select: {
                            approveTime: true,
                        },
                    },
                },
            })
            for (let i = 0; i < getpostdetail.length; i++) {
                allpost.push(getpostdetail[i])
            }
        }
        let unexpirepost = []
        for (let i = 0; i < allpost.length; i++) {
            if (allpost[i].annExpired > date) {
                unexpirepost.push(allpost[i])
            }
        }
        res.send(unexpirepost)
    } catch (err) {
        res.status(400).send("Error find to post")
    }
})


announcementRoutes.get("/gethistorypost", getHistoryPost)

announcementRoutes.get("/getwaitingpost", getWaitingPost)

announcementRoutes.get("/getdeletepost", getDeletePost)

announcementRoutes.get("/getdetailedit/:id", getDetailEdit)

announcementRoutes.post("/gettargetgroup", getTargetGroup)

announcementRoutes.post("/editpinstatus", editPinStatus)

announcementRoutes.post("/editstatusonapprove", editstatusOnApproval)

announcementRoutes.post("/editstatusonrecycle", editstatusOnRecyclebin)

announcementRoutes.post("/editstatusonhistory", editstatusOnHistory)

announcementRoutes.post("/editdetailpost", editDetailPost)

announcementRoutes.post("/deleteexpiredpost", deleteExpiredPost)

announcementRoutes.post("/createpost", createPost)

announcementRoutes.get("/gettypetarget", getTypeTarget)

announcementRoutes.get("/getotherlang", getOtherLang)


export default announcementRoutes
