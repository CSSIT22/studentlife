import { Request, Response } from "express"

const listtaskinfolder = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const body = req.body
    const userid = req.user?.userId
    const tasks = await prisma.task.findMany({
        where: {
            folderId: body.folderId,
        },
    })
    const folderInfo = await prisma.task_Folder.findFirst({
        where: {
            folderId: body.folderId,
        },
    })

    res.json({
        tasks: tasks,
        folderInfo: folderInfo,
    })
}

export default listtaskinfolder
