//create post
import axios from "axios"
import { Request, Response } from "express"
const createPost = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const body = req.body
    const userId = req.user?.userId
    const id = req.params.id
    

    const fd = require("form-data")
    const drive = axios.create({
        baseURL: "https://drive.modlifes.me/",
        headers: {
            Authorization: "Bearer GjkhtiJ12!",
            "Content-Type": " multipart/form-data",
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

        // const file_contain = await prisma.file_Container.create({
        //     data: {
        //         fileId: fileId || "",
        //         postId: postId,
        //         fileAddress: "https://staging-api.modlifes.me/airdrop/file/getfile/" + fileId || "",
        //     },
        // })
    }

    
    try {
        // console.log(body.communityID)
        const post = await prisma.student_Post.create({
            data: {
                userId: userId || "",
                body: body.postText,
            },
        })
        await prisma.community_Post.create({
            data: {
                communityId: body.communityID,
                isPinned: false,
                postId: post.postId,
            },
        })

        console.log(userId)
        res.status(201).send("Created Success")
    } catch (err) {
        console.log(err)
        res.status(403)
    }
}
export default createPost
