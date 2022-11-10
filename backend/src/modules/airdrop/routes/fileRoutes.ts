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

        cb(null, path.join(__dirname, "../files" + "/" + fileType))
    },
    filename: function (req: any, file: any, cb: any) {
        cb(null, file.originalname)
    },
})
const upload = multer({ storage: storage })

const fileRoutes = express()

fileRoutes.get("/", async (req: Request, res: Response)=>{
    console.log(req.user?.userId)
})

fileRoutes.post("/upload", upload.array("files"), async (req: Request, res: Response) => {
    console.log("Upload sucessful")
    console.log(req.body)
    const sender = req.user?.userId;
    console.log(sender);
    try {
        const payload: any = []
        //mapping files
        ;(req.files as Array<Express.Multer.File>).map((item: any) => {
            const newDate = new Date(req.body.expireDate);
            payload.push({
                fileName: item.originalname,
                fileSender: sender,
                sendType: req.body.type,
                fileDesc: req.body.description,
                fileExpired: req.body.expireDate,
            })
        })

        const fileUpload = await prisma.file_Info.createMany({
            data: payload,
        })
    } catch (err) {
        console.log(err)
    }
})
fileRoutes.get("/download/:type/:id", (req: Request, res: Response) => {
    const directoryPath = path.join(__dirname, "../files" + "/" + req.params.type)
    res.download(directoryPath + "/" + req.params.id)
})
export default fileRoutes
