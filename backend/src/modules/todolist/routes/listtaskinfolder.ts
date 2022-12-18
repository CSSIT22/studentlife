import { Request, Response } from "express"

const listtaskinfolder = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const body = req.body
    const userid = req.user?.userId
    let tasks
    if (body.orderBy == "complete" || body.orderBy == "incomplete") {
        tasks = await prisma.task_Check.findMany({
            where: {
                taskCheck: {
                    folderId: body.folderId,
                },
                userId: {
                    equals: userid,
                },
                isCheck: body.orderBy == "complete",
            },
            include: {
                taskCheck: true,
            },
        })
    } else {
        tasks = await prisma.task_Check.findMany({
            orderBy: [
                {
                    taskCheck: {
                        [body.orderBy || "taskName"]: "asc",
                    },
                },
            ],
            where: {
                taskCheck: {
                    folderId: body.folderId,
                },
                userId: userid,
                // userId: {
                //     equals: userid,
                // },
            },
            include: {
                taskCheck: true,
            },
        })
    }

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
