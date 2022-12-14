import axios from "axios"
import { Request, Response } from "express"

const fd = require("form-data")

const drive = axios.create({
    baseURL: "https://drive.modlifes.me/",
    headers: {
        Authorization: "Bearer GjkhtiJ12!",
        "Content-Type": " multipart/form-data",
    },
})

const editmyreview = async (req: Request, res: Response) => {
    console.log(req.body)
    const prisma = res.prisma
    const user = req.user?.userId
    const editReview: any = {
       //  shopId: parseInt(req.body.shopId),
       // userId: user,
        text: req.body.text,
        rating: parseInt(req.body.rating),
    }

    try {
        await prisma.sReview_Review.update({
            where: {
                reviewId: req.body.reviewId,
            },
            data: editReview,
        })



        
        // file update 
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
                    fileSender: user + "",
                    sendType: "shopreview",
                    fileDesc: "",
                    fileExpired: new Date(),
                })
            })
            // store file info
            const fileUpload = await prisma.file_Info
                .createMany({
                    data: payload,
                })
                .then((res: any) => {})
                .catch((err: any) => {
                    console.log(err)
                })
            const payload2: any = []

            const rId = req.body.reviewId
            resFileId.map((item: any) => {
                payload2.push({
                    reviewId: rId,
                    fileId: item.Id,
                })
            })
            const linkId = await prisma.sReview_Review_File
                .createMany({
                    data: payload2,
                })
                .then((res: any) => {})
                .catch((err: any) => {
                    console.log(err)
                })
                // finish file

            res.send("success")
        } catch (err) {
            console.log(err)
            res.send("some error")
        }
    } catch (err) {
        console.log(err)
        res.send("some error my review")
    }
}

export default editmyreview
