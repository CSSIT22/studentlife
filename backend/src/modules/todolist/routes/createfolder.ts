import { Request, Response } from "express"

const createFolder = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const body = req.body
    const userid = req.user?.userId || ""
    console.log(req.user)

    const folder: any = {
        folderName: body.folderName,
        userId: userid,
    }

    try {
        const createFolder = await prisma.task_Folder.create({
            data: folder,
        })
    } catch (e: any) {
        console.log(e)

        res.status(400).send(e.toString())
        return
    }

    return res.send("Folder Successfully Created")
}

export default createFolder
