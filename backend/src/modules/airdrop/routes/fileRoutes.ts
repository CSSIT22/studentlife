import express, { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

//file manage module
const path = require("path")
const fs = require("fs")
const multer = require("multer")

//prisma
const prisma = new PrismaClient()
//config destionation here
const storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
        const fileType = req.body.type
        fs.mkdir(path.join(__dirname, "../files/" + fileType.toLowerCase()), { recursive: true }, (err: any) => {
            if (err) throw err
            cb(null, path.join(__dirname, "../files" + "/" + fileType))
        })
    },
    filename: function (req: any, file: any, cb: any) {
        cb(null, req.user?.userId + file.originalname)
    },
})
const upload = multer({ storage: storage })

const fileRoutes = express()
fileRoutes.use(express.json())

fileRoutes.get("/", async (req: Request, res: Response) => {
    console.log(req.user?.userId)
})

fileRoutes.get("/getallfile", async (req: Request, res: Response) => {
    //fetch everone type
    try {
        const isShow = await prisma.user_Show_File.findMany({
            where: {
                userId: req.user?.userId,
            },
            select: {
                fileId: true,
            },
        })
        const everyone = await prisma.file_Info.findMany({
            where: {
                AND: [
                    {
                        fileSender: {
                            not: req.user?.userId,
                        },
                    },
                    {
                        AND: [
                            {
                                fileId: {
                                    notIn: isShow.map((item) => item.fileId),
                                },
                            },
                            {
                                sendType: "Everyone",
                            },
                        ],
                    },
                ],
            },
        })
        //result will add senderName
        const result = []
        for (const item of everyone) {
            const user = await prisma.user_Profile.findFirst({
                where: {
                    userId: item.fileSender,
                },
                select: {
                    fName: true,
                    lName: true,
                },
            })
            const senderId = item.fileSender
            result.push({
                ...item,
                fileSender: user?.fName + " " + user?.lName,
                senderId: senderId,
            })
        }
        const lastResult = result.map((item) => {
            return {
                ...item,
                comments: [],
            }
        })
        res.json(lastResult)
    } catch (err) {
        console.log(err)
    }
})

fileRoutes.post("/upload", upload.array("files"), async (req: Request, res: Response) => {
    console.log("Upload sucessful")
    console.log(req.body)
    const sender = await req.user?.userId
    console.log(sender)
    try {
        const payload: any = []
        //mapping files
        ;(req.files as Array<Express.Multer.File>).map((item: any) => {
            const newDate = new Date(req.body.expireDate)
            payload.push({
                fileName: item.originalname,
                fileSender: sender,
                sendType: req.body.type,
                fileDesc: req.body.description,
                fileExpired: newDate,
            })
        })

        const fileUpload = await prisma.file_Info.createMany({
            data: payload,
        })
    } catch (err) {
        console.log(err)
    }
})
fileRoutes.get("/download/:type/:filename", (req: Request, res: Response) => {
    const directoryPath = path.join(__dirname, "../files" + "/" + req.params.type)
    res.download(directoryPath + "/" + req.params.filename)
})

fileRoutes.post("/hidefile", async (req: Request, res: Response) => {
    const { fileId } = req.body
    // console.log(req.body);
    const payload: any = {
        userId: req.user?.userId,
        fileId: fileId,
    }
    const hide = await prisma.user_Show_File.create({
        data: payload,
    })
    res.json("hide file sucessful")
})

//function that will delete expired file
const deleteExpiredFile = async () => {
    const today = new Date()
    const expiredFile = await prisma.file_Info.findMany({
        where: {
            fileExpired: {
                lt: today,
            },
        },
    })
    expiredFile.map(async (item) => {
        const directoryPath = path.join(__dirname, "../files" + "/" + item.sendType)
        fs.unlink(directoryPath + "/" + item.fileName, (err: any) => {
            if (err) {
                console.log(err)
            }
        })
        await prisma.file_Info.delete({
            where: {
                fileId: item.fileId,
            },
        })
    })
}

//check expired file every 30 min
// setInterval(deleteExpiredFile, 1800000)

export default fileRoutes
