import { Request, Response } from "express"
// import axios from "axios";
// import fd from "form-data";

// const drive = axios.create({
//     baseURL: "https://drive.modlifes.me/",
//     headers: {
//         Authorization: "Bearer GjkhtiJ12!",
//         "Content-Type": "multipart/form-data",
//     }
// })

const createQuestion = async (req: Request, res: Response) => {
    //dbug
    // console.log(req.body)

    // const formData = new fd()
    // const fileList: any = req.file
    // fileList?.map((file: any) => {
    //     formData.append("upload", file.buffer, file.originalname)
    // })

    // let resFileId: {
    //     Id: string
    //     Name: string
    // }[] = []

    try {
        const { prisma } = res
        const userid = req.params.userid

        const currentDate = new Date()

        const newQuestion = await prisma.question.create({
            data: {
                userId: userid,
                qTitle: req.body.title,
                qDesc: req.body.desc,
                voteCount: 0,
                created: currentDate,
                lastUpdated: currentDate
            }
        })

        console.log(newQuestion)
        res.json({newQuestion})
        
    } catch (err) {
        console.log(err)
    }
}

export default createQuestion
