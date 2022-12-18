import axios from "axios"
import { Request, Response } from "express"
import ratingRoutes from "src/modules/dating/routes/rating"
const fd = require("form-data")

const drive = axios.create({
    baseURL: "https://drive.modlifes.me/",
    headers: {
        Authorization: "Bearer GjkhtiJ12!",
        "Content-Type": " multipart/form-data",
    },
})

const postmyreview = async (req: Request<any>, res: Response<any> | any) => {
    try {
        const prisma = res.prisma
        // const user = useContext(authContext)
        const user = req.user?.userId
        //console.log(req)
        console.log(req.body.shopId)
        console.log(req.body.resId)

        if (req.body.shopId === undefined) {
            console.log("Bomb1===================================")

            const postmyreview: any = {
                //ให้ไปทำงานที่ sre_re ก่อน เอาไอดีมาก่่อน
                // reviewId: req.body.reviewId,
                // resId: req.body.resId || null,
                resId: req.body.resId + "",
                userId: user,
                text: req.body.text,
                rating: parseInt(req.body.rating),
                likeReceived: 0,
            }

            const rev = await prisma.sReview_Review.create({
                data: {
                    ...postmyreview,
                },
            })
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

                const rId = rev.reviewId
                resFileId.map((item: any) => {
                    payload2.push({
                        reviewId: rId,
                        fileId: item.Id,
                    })
                })
                const linkId = await prisma.SReview_Review_File.createMany({
                    data: payload2,
                })
                    .then((res: any) => {})
                    .catch((err: any) => {
                        console.log(err)
                    })
                res.send(rev)
            } catch (err) {
                console.log(err)
                res.send("some error")
            }
        } else {
            console.log("Bomb2===================================")
            // console.log(" Bomb ")

            const postmyreview: any = {
                //ให้ไปทำงานที่ sre_re ก่อน เอาไอดีมาก่่อน
                // reviewId: req.body.reviewId,
                // resId: req.body.resId || null,
                shopId: req.body.shopId + "",
                userId: user,
                text: req.body.text,
                rating: parseInt(req.body.rating),
                likeReceived: 0,
            }

            const rev = await prisma.sReview_Review.create({
                data: {
                    ...postmyreview,
                },
            })
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

                const rId = rev.reviewId
                resFileId.map((item: any) => {
                    payload2.push({
                        reviewId: rId,
                        fileId: item.Id,
                    })
                })
                const linkId = await prisma.SReview_Review_File.createMany({
                    data: payload2,
                })
                    .then((res: any) => {})
                    .catch((err: any) => {
                        console.log(err)
                    })
                res.send(rev)
            } catch (err) {
                console.log(err)
                res.send("some error")
            }
        }
    } catch (err) {}
}
export default postmyreview
