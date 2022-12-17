import { Access_Type } from "@prisma/client"
import { Request, Response } from "express"
import axios from "axios"
const fd = require("form-data")

const drive = axios.create({
    baseURL: "https://drive.modlifes.me",
    headers: {
        Authorization: "Bearer GjkhtiJ12!",
        "Content-Type": " multipart/form-data",
    },
})
const uploadFile = async (req: Request<any>, res: Response<any>) => {
    const sender: any = await req.user?.userId
    const { prisma } = res
    const receiverBody = req.body.receiver
    //save file to drive
    const formData = new fd()
    const fileList: any = req.files
    fileList?.map((file: any) => {
        formData.append("upload", file.buffer, file.originalname)
    })
    let resFileId: {
        Id: string
        Name: string
    }[] = []
    const saveFile = await drive
        .post("/", formData)
        .then((res: any) => {
            resFileId = res.data
        })
        .catch((err: any) => {
            console.log(err)
        })
    try {
        const payload: {
            fileId: string
            fileName: string
            fileSender: string
            sendType: string
            fileDesc: string
            fileExpired: Date
        }[] = []
        ;(req.files as Array<Express.Multer.File>).map((item: any) => {
            const newDate = new Date(req.body.expireDate)
            const indexId = resFileId.findIndex((file: any) => file.Name === item.originalname)
            payload.push({
                fileId: resFileId[indexId].Id,
                fileName: item.originalname,
                fileSender: sender,
                sendType: req.body.type,
                fileDesc: req.body.description,
                fileExpired: newDate,
            })
        })
        // store file info
        const fileUpload = await prisma.file_Info.createMany({
            data: payload,
        })
        //get recent upload file
        const recentUpload = await prisma.file_Info.findMany({
            where: {
                fileSender: sender,
            },
            orderBy: {
                fileId: "desc",
            },
            select: {
                fileId: true,
            },
            take: fileUpload.count,
        })
        // create file access
        for (const item of recentUpload) {
            const accessArr = [Access_Type.EVERYONE, Access_Type.COMMUNITY, Access_Type.MAJOR, Access_Type.DIRECT]
            const reqType = ["Everyone", "Community", "Department", "Specific"]
            const index = reqType.indexOf(req.body.type)
            const fileAccess = await prisma.file_Access.create({
                data: {
                    fileId: item.fileId,
                    accessType: accessArr[index],
                },
            })
        }

        //insert file id and sender to history
        const hisPayload: any = []
        recentUpload.map((item: any) => {
            hisPayload.push({
                fileId: item.fileId,
                userId: sender,
                historyType: "UPLOAD",
                createdAt: new Date(Date.now() + 60 * 60 * 1000),
            })
        })
        const history = await prisma.file_History.createMany({
            data: hisPayload,
        })

        //handle multiple receiver
        if (req.body.receiver != null && req.body.receiver != "everyone") {
            if (req.body.type == "Department") {
                const recentAccess = await prisma.file_Access.findMany({
                    orderBy: {
                        accessId: "desc",
                    },
                    select: {
                        accessId: true,
                    },
                    where: {
                        accessType: {
                            equals: Access_Type.MAJOR,
                        },
                    },
                    take: fileUpload.count,
                })

                const receiverList = []
                if (typeof receiverBody == typeof "string") {
                    receiverList.push(receiverBody)
                } else {
                    const receiverArr = Object.keys(req.body.receiver).map((key) => req.body.receiver[key])
                    for (const item of receiverArr) {
                        receiverList.push(item)
                    }
                }
                //recent file access
                // recentAccess <= array of accessID
                // insert file access to department table

                const payload: any = []
                if (recentAccess.length > 1) {
                    //many file many group
                    for (const item of recentAccess) {
                        for (const group of receiverList) {
                            payload.push({
                                accessId: item.accessId,
                                majorId: group,
                            })
                        }
                    }
                } else {
                    //1 file many major & 1 file one major
                    for (const item of receiverList) {
                        payload.push({
                            accessId: recentAccess[0].accessId,
                            majorId: item,
                        })
                    }
                }
                const departmentAccess = await prisma.major_Access.createMany({
                    data: payload,
                })
            } else if (req.body.type == "Community") {
                //get recent file access
                const recentAccess = await prisma.file_Access.findMany({
                    orderBy: {
                        accessId: "desc",
                    },
                    select: {
                        accessId: true,
                    },
                    where: {
                        accessType: {
                            equals: Access_Type.COMMUNITY,
                        },
                    },
                    take: fileUpload.count,
                })
                const receiverListId = []
                if (typeof receiverBody == typeof "string") {
                    const receiver = await prisma.community.findFirst({
                        where: {
                            communityName: req.body.receiver,
                        },
                        select: {
                            communityId: true,
                        },
                    })
                    receiverListId.push(receiver?.communityId)
                } else {
                    const receiverArr = Object.keys(req.body.receiver).map((key) => req.body.receiver[key])
                    for (const item of receiverArr) {
                        const receiver = await prisma.community.findFirst({
                            where: {
                                communityName: item,
                            },
                            select: {
                                communityId: true,
                            },
                        })
                        receiverListId.push(receiver?.communityId)
                    }
                }

                // insert file access to community table
                const payload: any = []
                // insert file access to specific table
                if (recentAccess.length > 1) {
                    //many file many commu
                    for (const item of recentAccess) {
                        for (const receiver of receiverListId) {
                            payload.push({
                                accessId: item.accessId,
                                communityId: receiver,
                            })
                        }
                    }
                } else {
                    //1 file many commu & 1 file one commu
                    for (const item of receiverListId) {
                        payload.push({
                            accessId: recentAccess[0].accessId,
                            communityId: item,
                        })
                    }
                }
                const communityAccess = await prisma.community_Access.createMany({
                    data: payload,
                })
            } else if (req.body.type == "Specific") {
                //get recent file access
                const recentAccess = await prisma.file_Access.findMany({
                    orderBy: {
                        accessId: "desc",
                    },
                    select: {
                        accessId: true,
                    },
                    where: {
                        accessType: {
                            equals: Access_Type.DIRECT,
                        },
                    },
                    take: fileUpload.count,
                })
                const receiverListId = []
                if (typeof receiverBody == typeof "string") {
                    const receiver = await prisma.user_Profile.findFirst({
                        where: {
                            AND: [
                                {
                                    fName: receiverBody.split(" ")[0],
                                },
                                {
                                    lName: receiverBody.split(" ")[1],
                                },
                            ],
                        },
                        select: {
                            userId: true,
                        },
                    })
                    receiverListId.push(receiver?.userId)
                } else {
                    const receiverArr = Object.keys(req.body.receiver).map((key) => req.body.receiver[key])
                    for (const item of receiverArr) {
                        const receiver = await prisma.user_Profile.findFirst({
                            where: {
                                AND: [
                                    {
                                        fName: item.split(" ")[0],
                                    },
                                    {
                                        lName: item.split(" ")[1],
                                    },
                                ],
                            },
                            select: {
                                userId: true,
                            },
                        })
                        receiverListId.push(receiver?.userId)
                    }
                }
                const payload: any = []
                // insert file access to specific table
                if (recentAccess.length > 1) {
                    //many file many receiver
                    for (const item of recentAccess) {
                        for (const receiver of receiverListId) {
                            payload.push({
                                accessId: item.accessId,
                                userId: receiver,
                            })
                        }
                    }
                } else {
                    //1 file many major & 1 file one major
                    for (const item of receiverListId) {
                        payload.push({
                            accessId: recentAccess[0].accessId,
                            userId: item,
                        })
                    }
                }
                const departmentAccess = await prisma.direct_Access.createMany({
                    data: payload,
                })
            }
            res.status(200).json({ message: "Upload success" })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Upload failed" })
    }
}
export default uploadFile
