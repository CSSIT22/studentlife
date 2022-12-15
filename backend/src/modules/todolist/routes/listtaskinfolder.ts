import { Request, Response } from "express"

const listtaskinfolder = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const body = req.body
    const userid = req.user?.userId
    let result
    if (body.orderBy == "complete" || body.orderBy == "incomplete") {
        result = await prisma.$queryRawUnsafe(
            `SELECT * FROM "Task" LEFT JOIN "Task_Check" ON "Task"."taskId" = "Task_Check"."taskId" WHERE "Task"."userId"=$1 AND "Task_Check"."isCheck" = $2`,
            userid,
            body.orderBy == "complete"
        )
    } else {
        result = await prisma.task_Folder.findFirst({
            // orderBy: [
            //     {
            //         taskCheck: {
            //             [body.orderBy || "taskName"]: "asc",
            //         },
            //     },
            // ],
            // where: {
            //     userId: {
            //         equals: userid,
            //     },
            //     taskCheck: {
            //         folderId: {
            //             equals: body.folderId,
            //         },
            //     },
            // },
            where: {
                userId: userid,
                folderId: body.folderId,
            },
            include: {
                tasks: {
                    include: {
                        checkTask: { select: { isCheck: true } },
                    },
                },
                // taskCheck: true,
            },
        })
    }

    console.log(result)

    res.json(result)
}

export default listtaskinfolder
