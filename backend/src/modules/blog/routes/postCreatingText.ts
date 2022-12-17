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

const postCreatingText = async (req: Request, res: Response | any) => {
    console.log(req.body)
    const formData = new fd()
    const fileList: any = req.files

    let postId = ""

    const prisma = res.prisma
    const body = req.body
    if (req.body != null) {
        const post = await prisma.student_Post
            .create({
                data: {
                    userId: req.user?.userId || "",
                    body: req.body.text,
                },
            })

            .then((res: any) => {
                postId = res.postId
            })
            .catch((err: any) => {
                console.log(err)
            })
    }

    fileList?.map((file: any) => {
        formData.append("upload", file.buffer, file.originalname)
    })
    let resFileId: {
        Id: string
        Name: string
    }[] = []
    if (fileList.length > 0) {
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

        const file_contain = await prisma.file_Container.create({
            data: {
                fileId: fileId || "",
                postId: postId,
                fileAddress: "https://staging-api.modlifes.me/airdrop/file/getfile/" + fileId || "",
            },
        })
    }
    res.json({ status: "upload sucessfully" })
}

export default postCreatingText
