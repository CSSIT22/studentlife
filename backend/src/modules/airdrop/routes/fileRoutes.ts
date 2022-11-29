import express, { Request, Response } from "express"
import { verifyUser } from "../../backendService/middleware/verifyUser"
import getAllFile from "./functions/getAllFile"
import uploadFile from "./functions/uploadFile"
import downloadFile from "./functions/downloadFile"
import hideFile from "./functions/hideFile"
import commentFile from "./functions/commentFile"
import uploadOther from "./functions/uploadOther"
import { extname } from "path"
import getHistory from "./functions/getHistory"
import deleteExpiredFile from "./functions/deleteExpiredFile"

const path = require("path")
const fs = require("fs")
const multer = require("multer")
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
        cb(null, req.user?.userId + file.originalname + extname(file.originalname))
    },
})
// const upload = multer({ storage: storage })
const upload = multer()

const fileRoutes = express()
fileRoutes.use(express.json())
fileRoutes.use(express.urlencoded({ extended: true }))

fileRoutes.get("/", async (req: Request, res: Response) => {
    res.send(" Welcome to airdrop file API")
})

fileRoutes.get("/getallfile", verifyUser, getAllFile)
fileRoutes.get("/comment", getHistory)
fileRoutes.get("/download/:fileid", downloadFile)
fileRoutes.post("/upload", verifyUser, upload.array("upload"), uploadFile)
fileRoutes.post("/uploadother", verifyUser, upload.array("upload"), uploadOther)
fileRoutes.post("/hidefile", hideFile)
fileRoutes.post("/comment", commentFile)
fileRoutes.get("/gethistory", verifyUser, getHistory)

//check expired file every 5 minutes
// setInterval(deleteExpiredFile, 5000)

export default fileRoutes
