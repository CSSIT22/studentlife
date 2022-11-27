
import { verifyUser } from "./../backendService/middleware/verifyUser"
import { post } from "./../../../../types/announcement/index"
import express from "express"
import { getHeapCodeStatistics } from "v8"
import getDetail from "./routes/getdetail"
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
import getLang from "./routes/getotherlang"
import getOtherLang from "./routes/getotherlang"
import { timeStamp } from "console"

const announcementRoutes = express()

announcementRoutes.use(express.json())

export let posts: post[] = [
    {
        postId: 0,
        userId: "s9MVUEgDL1Oq8yrzaEL6z",
        languageId: 1000,
        annTopic: "Hello World",
        annDetail: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        sender: "SAMO-SIT",
        status: "approve",
        pinStatus: false,
        isApprove: true,
        targetType: "Year",
        targetValue: "1",
        postAt: new Date(),
        expiredOfPost: new Date("2022-11-30"),
        expiredAfterDelete: new Date(),
        addMoreLang: [
            { id: 0, languageId: 1001, annTopic: "สวัสดีชาวโลก", annDetail: "สวัสดีฉันชื่อ modlifes" },
            { id: 1, languageId: 1002, annTopic: "unnyeong", annDetail: "Korean Kimchi" },
        ],
    },
    {
        postId: 1,
        userId: "s9MVUEgDL1Oq8yrzaEL6z",
        languageId: 1000,
        annTopic: "Hello World1",
        annDetail: "Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        sender: "SAMO-SIT",
        status: "waiting",
        pinStatus: false,
        isApprove: false,
        targetType: "Major",
        targetValue: "Computer Science",
        postAt: new Date(),
        expiredOfPost: new Date("2022-11-10"),
        expiredAfterDelete: new Date(),
        addMoreLang: [],
    },
    {
        postId: 2,
        userId: "s9MVUEgDL1Oq8yrzaEL6z",
        languageId: 1000,
        annTopic: "Hello World2",
        annDetail: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        sender: "SAMO-SIT",
        status: "approve",
        pinStatus: false,
        isApprove: true,
        targetType: "Year",
        targetValue: "1",
        postAt: new Date(),
        expiredOfPost: new Date("2022-11-30"),
        expiredAfterDelete: new Date(),
        addMoreLang: [],
    },
    {
        postId: 3,
        userId: "s9MVUEgDL1Oq8yrzaEL6z",
        languageId: 1000,
        annTopic: "Hello World3",
        annDetail: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        sender: "SAMO-SIT",
        status: "delete",
        pinStatus: false,
        isApprove: true,
        targetType: "Year",
        targetValue: "1",
        postAt: new Date(),
        expiredOfPost: new Date("2022-11-30"),
        expiredAfterDelete: new Date(),
        addMoreLang: [],
    },
    {
        postId: 4,
        userId: "wFbN9qrwUbCgrEtfpIEVf",
        languageId: 1000,
        annTopic: "Hello World4",
        annDetail: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        sender: "SAMO-SIT",
        status: "approve",
        pinStatus: false,
        isApprove: true,
        targetType: "Year",
        targetValue: "1",
        postAt: new Date(),
        expiredOfPost: new Date("2022-11-30"),
        expiredAfterDelete: new Date(),
        addMoreLang: [],
    },
    {
        postId: 5,
        userId: "wFbN9qrwUbCgrEtfpIEVf",
        languageId: 1000,
        annTopic: "Hello World5",
        annDetail: "Loorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        sender: "SAMO-SIT",
        status: "disapprove",
        pinStatus: false,
        isApprove: false,
        targetType: "Year",
        targetValue: "1",
        postAt: new Date(),
        expiredOfPost: new Date("2022-11-12"),
        expiredAfterDelete: new Date(),
        addMoreLang: [],
    },
    {
        postId: 6,
        userId: "wFbN9qrwUbCgrEtfpIEVf",
        languageId: 1000,
        annTopic: "Hello World6",
        annDetail: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        sender: "SAMO-SIT",
        status: "delete",
        pinStatus: false,
        isApprove: true,
        targetType: "Year",
        targetValue: "1",
        postAt: new Date(),
        expiredOfPost: new Date("2022-11-24"),
        expiredAfterDelete: new Date(),
        addMoreLang: [],
    },
    {
        postId: 7,
        userId: "wFbN9qrwUbCgrEtfpIEVf",
        languageId: 1000,
        annTopic: "Hello World7",
        annDetail: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        sender: "SAMO-SIT",
        status: "waiting",
        pinStatus: false,
        isApprove: false,
        targetType: "Faculty",
        targetValue: "School of Information Technology",
        postAt: new Date(),
        expiredOfPost: new Date("2022-11-24"),
        expiredAfterDelete: new Date(),
        addMoreLang: [],
    },
    {
        postId: 8,
        userId: "wFbN9qrwUbCgrEtfpIEVf",
        languageId: 1000,
        annTopic: "Hello World8",
        annDetail: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        sender: "SAMO-SIT",
        status: "waiting",
        pinStatus: false,
        isApprove: false,
        targetType: "Year",
        targetValue: "2",
        postAt: new Date(),
        expiredOfPost: new Date("2022-11-24"),
        expiredAfterDelete: new Date(),
        addMoreLang: [],
    },
    {
        postId: 9,
        userId: "wFbN9qrwUbCgrEtfpIEVf",
        languageId: 1000,
        annTopic: "Hello World9",
        annDetail: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        sender: "SAMO-SIT",
        status: "waiting",
        pinStatus: false,
        isApprove: false,
        targetType: "Everyone",
        targetValue: "",
        postAt: new Date(),
        expiredOfPost: new Date("2022-11-24"),
        expiredAfterDelete: new Date(),
        addMoreLang: [],
    },
]

export const getPost = () => {
    return posts
}
export const setPost = (newData: post[]) => {
    posts = newData
}

announcementRoutes.get("/getPostOnAnnouncement", async (req, res) => {
    const minute = 1000 * 60
    const hour = minute * 60
    const day = hour * 24
    const date = new Date()
    const currentD = Math.round(date.getTime() / day)
    const prisma = res.prisma

    try{
        const getpostid = await prisma.announcement_Pin.findMany({
            where:{
                userId: req.user?.userId || ""
            },
            select:{
                postId: true
            }
        })
        let allpost = []
        for (let i = 0; i < getpostid.length; i++) {
            const getpostdetail = await prisma.announcement.findMany({
                where:{
                    postId: getpostid[i].postId,
                    isApprove: true,
                    annPost:{
                        status: "Approve"
                    }
                },
                select:{
                    postId: true,
                    userId: true,
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
                    annExpired: true,
                    annPin:{
                        where:{
                            userId: req.user?.userId
                        },
                        select:{
                            status: true
                        }
                    }
                }

            })
            for(let i=0;i<getpostdetail.length;i++){
                allpost.push(getpostdetail[i])
            }
            
        }
        console.log(allpost)
        console.log(allpost[0].annPin[0].status)
        res.send(allpost)
        
    }
    catch(err:any){
        res.send(err)
        res.status(400).send("Error find to post")
    }
    // let selectpost: post[] = []
    // getPost().forEach((post) => {
    //     if (post.isApprove == true) {
    //         if (post.status == "Approve") {
    //             const expired = new Date(post.expiredOfPost)
    //             const expiredPost = Math.round(expired.getTime() / day)
    //             const diff = expiredPost - currentD
    //             if (diff > 0) {
    //                 selectpost.push(post)
    //             }
    //         }
    //     }
    // })
    // res.send(selectpost)
})

announcementRoutes.get("/getdetail/:id", getDetail)

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

announcementRoutes.post("/createpost", createPost)

announcementRoutes.get("/gettypetarget", getTypeTarget)

announcementRoutes.get("/getotherlang", getOtherLang)

announcementRoutes.get("/test", async (req,res) =>{
    const prisma = res.prisma
    // const announcer = [{userId:"s9MVUEgDL1Oq8yrzaEL6z"}, {userId:"wFbN9qrwUbCgrEtfpIEVf"}]
    try {
        // const role = await prisma.role.create({
        //     data: {
        //         users:{
        //             createMany:{
        //                 data: announcer
        //             }
        //         },
        //         roleName:"ANNOUNCEMENT_APPROVER",
        //         expired: new Date()
        //     }
        // })
        // const newFilter = await prisma.announcement_Filter.findFirst({
        //     where:{
        //         filterType:"Major",
        //         value:"Computer Science"
        //     },
        //     select:{
        //         filterId:true
        //     }
        // })
        // console.log(typeof(newFilter?.filterId));
        // const res = await prisma.user_Profile.findUnique({
        //     where: {
        //         userId: req.user?.userId || ""
        //     }
        // })
        // const faculty = await prisma.major.findUnique({
        //     where: {
        //         majorId: res?.majorId || ""
        //     },
        //     select: {
        //         majorFaculty:true
        //     }
        // })
        // console.log(res)
        // console.log(faculty)
        // res.send(role)
        // console.log(role);
        
    } catch (err: any) {
        console.log(err)
        res.status(500)
    }
})

export default announcementRoutes
