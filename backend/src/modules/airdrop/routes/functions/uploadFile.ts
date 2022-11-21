const axios = require("axios")
const multer = require("multer")
const uploadFile = async (req: Request | any | string, res: Response | any) => {
    const sender = await req.user?.userId
    const { prisma } = res
    console.log(req.files)
    console.log(req.body)

    // const fileFormData = new FormData();
    // fileFormData.append("upload", req.files[0])
    const saveFile = await axios
        .post(
            "https://drive.modlifes.me/", 
            req.files,
            {
                headers: {
                    'Authorization': "Bearer GjkhtiJ12!",
                    'Content-Type': 'multipart/form-data',
                },
            },
        )
        .then((res: any) => {
            console.log(res)
        })
        .catch((err: any) => {
            console.log(err)
        })
    // try {
    //     const payload: {
    //         fileName: string
    //         fileSender: string
    //         sendType: string
    //         fileDesc: string
    //         fileExpired: Date
    //     }[] = []
    //     ;(req.files as Array<Express.Multer.File>).map((item: any) => {
    //         const newDate = new Date(req.body.expireDate)
    //         payload.push({
    //             fileName: item.originalname,
    //             fileSender: sender,
    //             sendType: req.body.type,
    //             fileDesc: req.body.description,
    //             fileExpired: newDate,
    //         })
    //     })
    //     // store file info
    //     const fileUpload = await prisma.file_Info.createMany({
    //         data: payload,
    //     })
    //     //get recent upload file
    //     const recentUpload = await prisma.file_Info.findMany({
    //         where: {
    //             fileSender: sender,
    //         },
    //         orderBy: {
    //             fileId: "desc",
    //         },
    //         select: {
    //             fileId: true,
    //         },
    //         take: fileUpload.count,
    //     })
    //     // create file access
    //     for (const item of recentUpload) {
    //         const accessArr = [Access_Type.EVERYONE, Access_Type.COMMUNITY, Access_Type.MAJOR, Access_Type.DIRECT]
    //         const reqType = ["Everyone", "Community", "Department", "Specific"]
    //         const index = reqType.indexOf(req.body.type)
    //         const fileAccess = await prisma.file_Access.create({
    //             data: {
    //                 fileId: item.fileId,
    //                 accessType: accessArr[index],
    //             },
    //         })
    //     }

    //     //insert file id and sender to history
    //     const hisPayload: any = []
    //     recentUpload.map((item: any) => {
    //         hisPayload.push({
    //             fileId: item.fileId,
    //             userId: sender,
    //             historyType: "UPLOAD",
    //             createdAt: new Date(Date.now() + 60 * 60 * 1000),
    //         })
    //     })
    //     const history = await prisma.file_History.createMany({
    //         data: hisPayload,
    //     })

    //     //handle multiple receiver
    //     if (req.body.receiver != null && req.body.receiver != "everyone") {
    //         if (req.body.type == "Department") {
    //             //get recent file access
    //             const recentAccess = await prisma.file_Access.findMany({
    //                 orderBy: {
    //                     accessId: "desc",
    //                 },
    //                 select: {
    //                     accessId: true,
    //                 },
    //                 where: {
    //                     accessType: {
    //                         equals: Access_Type.MAJOR,
    //                     },
    //                 },
    //                 take: fileUpload.count,
    //             })
    //             const receiverListId: string[] = [] //departmentid
    //             if (req.body.receiver != typeof Array) {
    //                 receiverListId.push(req.body.receiver)
    //             } else {
    //                 receiverListId.push(...req.body.receiver)
    //             }
    //             //recent file access
    //             // recentAccess <= array of accessID
    //             // insert file access to department table
    //             let i = 0
    //             const payload: any = []
    //             receiverListId.map((item: string) => {
    //                 payload.push({
    //                     accessId: recentAccess[i].accessId,
    //                     majorId: item,
    //                 })
    //                 i++
    //             })
    //             const departmentAccess = await prisma.major_Access.createMany({
    //                 data: payload,
    //             })
    //         } else if (req.body.type == "Community") {
    //             //get recent file access
    //             const recentAccess = await prisma.file_Access.findMany({
    //                 orderBy: {
    //                     accessId: "desc",
    //                 },
    //                 select: {
    //                     accessId: true,
    //                 },
    //                 where: {
    //                     accessType: {
    //                         equals: Access_Type.COMMUNITY,
    //                     },
    //                 },
    //                 take: fileUpload.count,
    //             })
    //             const receiverListId = []
    //             if (req.body.receiver != typeof Array) {
    //                 const receiver = await prisma.community.findFirst({
    //                     where: {
    //                         communityName: req.body.receiver,
    //                     },
    //                     select: {
    //                         communityId: true,
    //                     },
    //                 })
    //                 receiverListId.push(receiver?.communityId)
    //             } else {
    //                 for (const item of req.body.receiver) {
    //                     const receiver = await prisma.community.findFirst({
    //                         where: {
    //                             communityName: item,
    //                         },
    //                         select: {
    //                             communityId: true,
    //                         },
    //                     })
    //                     receiverListId.push(receiver?.communityId)
    //                 }
    //             }

    //             // insert file access to community table
    //             let i = 0
    //             const payload: any = []
    //             receiverListId.map((item: string) => {
    //                 payload.push({
    //                     accessId: recentAccess[i].accessId,
    //                     communityId: item,
    //                 })
    //                 i++
    //             })
    //             const communityAccess = await prisma.community_Access.createMany({
    //                 data: payload,
    //             })
    //         } else if (req.body.type == "Specific") {
    //             //get recent file access
    //             const recentAccess = await prisma.file_Access.findMany({
    //                 orderBy: {
    //                     accessId: "desc",
    //                 },
    //                 select: {
    //                     accessId: true,
    //                 },
    //                 where: {
    //                     accessType: {
    //                         equals: Access_Type.DIRECT,
    //                     },
    //                 },
    //                 take: fileUpload.count,
    //             })
    //             const receiverListId = []
    //             if (req.body.receiver != typeof Array) {
    //                 const receiver = await prisma.user_Profile.findFirst({
    //                     where: {
    //                         AND: [
    //                             {
    //                                 fName: req.body.receiver.split(" ")[0],
    //                             },
    //                             {
    //                                 lName: req.body.receiver.split(" ")[1],
    //                             },
    //                         ],
    //                     },
    //                     select: {
    //                         userId: true,
    //                     },
    //                 })
    //                 receiverListId.push(receiver?.userId)
    //             } else {
    //                 for (const item of req.body.receiver) {
    //                     const receiver = await prisma.user_Profile.findFirst({
    //                         where: {
    //                             AND: [
    //                                 {
    //                                     fName: item.split(" ")[0],
    //                                 },
    //                                 {
    //                                     lName: item.split(" ")[1],
    //                                 },
    //                             ],
    //                         },
    //                         select: {
    //                             userId: true,
    //                         },
    //                     })
    //                     receiverListId.push(receiver?.userId)
    //                 }
    //             }

    //             // insert file access to specific table
    //             let i = 0
    //             const payload: any = []
    //             receiverListId.map((item: string) => {
    //                 payload.push({
    //                     accessId: recentAccess[i].accessId,
    //                     userId: item,
    //                 })
    //                 i++
    //             })
    //             const departmentAccess = await prisma.direct_Access.createMany({
    //                 data: payload,
    //             })
    //         }
    //     }
    // } catch (err) {
    //     console.log(err)
    // }
}
export default uploadFile
