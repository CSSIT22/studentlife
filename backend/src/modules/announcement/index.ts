import { verifyUser } from "./../backendService/middleware/verifyUser"
import { post} from "./../../../../types/announcement/index"
import express from "express"
import { getHeapCodeStatistics } from "v8"
import getDetail from "./routes/getdetail"
import getHistoryPost from "./routes/gethistorypost"
import getWaitingPost from "./routes/getwaitingpost"
import getDeletePost from "./routes/getdeletepost"
import editPinStatus from "./routes/editpinstatus"
import getDetailApprove from "./routes/getdetailapprove"
import editstatusOnApprovel from "./routes/editstatusonapproval"

const announcementRoutes = express()

announcementRoutes.use(express.json())

export let posts: post[] = [
    {
        postId: 0,
        userId: "01",
        lang_id: 1000,
        topic: "Hello World",
        detail: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        sender: "SAMO-SIT",
        status: "approve",
        pinStatus: false,
        isApprove: true,
        targetType: "Year",
        targetValue: "1",
        postAt: new Date(),
        expiredOfPost: new Date("2022-11-30"),
        expiredAfterDelete: new Date(""),
        addMoreLang: [
            { id: 0, lang_id: 1001, topic: "สวัสดีชาวโลก", detail: "สวัสดีฉันชื่อ modlifes" },
            { id: 1, lang_id: 1002, topic: "unnyeong", detail: "Korean Kimchi" },
        ],
    },
    {
        postId: 1,
        userId: "02",
        lang_id: 1000,
        topic: "Hello World1",
        detail: "yyy Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        sender: "SAMO-SIT",
        status: "waiting",
        pinStatus: false,
        isApprove: false,
        targetType: "Year",
        targetValue: "1",
        postAt: new Date(),
        expiredOfPost: new Date("2022-11-10"),
        expiredAfterDelete: new Date(""),
        addMoreLang: [],
    },
    {
        postId: 2,
        userId: "02",
        lang_id: 1000,
        topic: "Hello World2",
        detail: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        sender: "SAMO-SIT",
        status: "approve",
        pinStatus: false,
        isApprove: true,
        targetType: "Year",
        targetValue: "1",
        postAt: new Date(),
        expiredOfPost: new Date("2022-11-30"),
        expiredAfterDelete: new Date(""),
        addMoreLang: [],
    },
    {
        postId: 3,
        userId: "03",
        lang_id: 1000,
        topic: "Hello World3",
        detail: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        sender: "SAMO-SIT",
        status: "delete",
        pinStatus: false,
        isApprove: true,
        targetType: "Year",
        targetValue: "1",
        postAt: new Date(),
        expiredOfPost: new Date("2022-11-30"),
        expiredAfterDelete: new Date("2022-11-20"),
        addMoreLang: [],
    },{
        postId: 4,
        userId:"05",
        lang_id: 1000,
        topic: "Hello World4",
        detail: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        sender: "SAMO-SIT",
        status: "approve",
        pinStatus: false,
        isApprove: true,
        targetType: "Year",
        targetValue: "1",
        postAt: new Date(),
        expiredOfPost: new Date("2022-11-30"),
        expiredAfterDelete: new Date(""),
        addMoreLang: [],
    },
    {
        postId: 5,
        userId:"06",
        lang_id: 1000,
        topic: "Hello World5",
        detail: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        sender: "SAMO-SIT",
        status: "disapprove",
        pinStatus: false,
        isApprove: false,
        targetType: "Year",
        targetValue: "1",
        postAt: new Date(),
        expiredOfPost: new Date("2022-11-12"),
        expiredAfterDelete: new Date(""),
        addMoreLang: [],
    },
    {
        postId: 6,
        userId:"07",
        lang_id: 1000,
        topic: "Hello World6",
        detail: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        sender: "SAMO-SIT",
        status: "delete",
        pinStatus: false,
        isApprove: true,
        targetType: "Year",
        targetValue: "1",
        postAt: new Date(),
        expiredOfPost: new Date("2022-11-24"),
        expiredAfterDelete: new Date("2022-11-28"),
        addMoreLang: [],
    },
]

export const getPost = () => {
    return posts
}
export const setPost = (newData: post[]) => {
    posts = newData
}

announcementRoutes.get("/getPostOnAnnouncement",  (req, res) => {
    const minute = 1000 * 60
    const hour = minute * 60
    const day = hour * 24
    const date = new Date()
    const currentD = Math.round(date.getTime() / day)
    let selectpost: post[] = []
    getPost().forEach((post) => {
        if (post.isApprove == true) {
            if(post.status == "approve"){
                const expired = new Date(post.expiredOfPost)
                const expiredPost = Math.round(expired.getTime() / day)
                const diff = expiredPost - currentD
                if (diff > 0) {
                    selectpost.push(post)
                }
            }

        }
    })
    res.send(selectpost)
})

announcementRoutes.get("/getdetail/:id", getDetail)

announcementRoutes.get("/gethistorypost/:id", getHistoryPost)

announcementRoutes.get("/getwaitingpost", getWaitingPost)

announcementRoutes.get("/getdeletepost", getDeletePost)

announcementRoutes.post("/editpinstatus",editPinStatus)

announcementRoutes.get("/getdetailapprove/:id", getDetailApprove)

announcementRoutes.post("/editstatusonapprove", editstatusOnApprovel)

announcementRoutes.get("/test", async (req,res) =>{
    const prisma = res.prisma
    try {
        const res = await prisma.user_Profile.findUnique({
            where: {
                userId: req.user?.userId || ""
            }
        })
        console.log(res)
    } catch (err: any) {
        console.log(err)
        res.status(500)
    }
    res.send(req.user)
})

export default announcementRoutes
