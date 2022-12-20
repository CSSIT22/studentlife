//create post
import axios from "axios"
import { Request, Response } from "express"
const createPost = async (req: Request, res: Response) => {
    
    try {
    const prisma = res.prisma
    const body = req.body
    const userId = req.user?.userId
    const fd = require("form-data")

    let postId = ""

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
    }).then((res: any) => {
        postId = res.postId
    })
    
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

    if (fileList) {
        const saveFile = await drive
            .post("/", formData)
            .then((res: any) => {
                resFileId = res.data
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


        res.status(201).send("Created Success")
    } catch (err) {
        
        res.status(403)
    }
}
export default createPost
