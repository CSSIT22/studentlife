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

const uploadFiles = async (req: Request<any>, res: Response<any>) => {
    try {
        const sender: any = await req.user?.userId
        const prisma = res.prisma
        const type = req.body.type
        const id = req.body.id
        //save file to drive
        const formData = new fd()
        const fileList = req.files
        ;(fileList as Array<any>).map((file: any) => {
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
        const payload: {
            fileId: string
            fileName: string
            fileSender: string
            sendType: string
            fileDesc: string
            fileExpired: Date
        }[] = []
        ;(req.files as Array<Express.Multer.File>).map((item: any) => {
            const indexId = resFileId.findIndex((file: any) => file.Name === item.originalname)
            payload.push({
                fileId: resFileId[indexId].Id,
                fileName: item.originalname,
                fileSender: sender,
                sendType: req.body.type,
                fileDesc: "",
                fileExpired: new Date(),
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
        const payloadSn: any = []
        recentUpload.map((item: any) => {
            payloadSn.push({
                fileId: item.fileId,
                snId: req.body.snId,
            })
        })
        const snInsertSn = await prisma.sn_File
            .createMany({
                data: payloadSn,
            })
            .catch((err: any) => {
                if (err) throw err
            })
        res.status(200).json({ message: "Upload successfully" })
    } catch (err) {
        if (err) throw err
        //console.log(err)
        res.status(500)
    }
}
export default uploadFiles
