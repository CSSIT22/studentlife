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

const postCreatingText = async (req: Request, res: Response) => {
    console.log(req.body)
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
            console.log("File ID from drive:" + resFileId[0].Id)
        })
        .catch((err: any) => {
            console.log(err)
        })
    const fileId = resFileId[0].Id
    const prisma = res.prisma
    const body = req.body
    const post = await prisma.student_Post.create({
        data: {
            userId: req.user?.userId || "",
            body: req.body.text,
        },
    })
    
    const image_contain = await prisma.image_Container.create({
        data: {
            imgId: fileId ,
            postId: post.postId,
            imageAddress: "https://staging-api.modlifes.me/airdrop/file/getfile/" + fileId,
        },
    })
    res.json({post, image_contain})
}

export default postCreatingText
