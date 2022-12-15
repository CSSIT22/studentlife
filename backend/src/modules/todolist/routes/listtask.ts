import { Request, Response } from "express"

const listtask = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const body = req.body
    const userid = req.user?.userId
    let result
    if (body.orderBy == "complete" || body.orderBy == "incomplete") {
        // result = await prisma.$queryRawUnsafe(
        //     `SELECT * FROM "Task" LEFT JOIN "Task_Check" ON "Task"."taskId" = "Task_Check"."taskId" WHERE "Task"."userId"=$1 AND "Task_Check"."isCheck" = $2`,
        //     userid,
        //     body.orderBy == "complete"
        // )
        result = await prisma.task_Check.findMany({
            where: {
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
        result = await prisma.task_Check.findMany({
            orderBy: [
                {
                    taskCheck: {
                        [body.orderBy || "taskName"]: "asc",
                    },
                },
            ],
            where: {
                userId: {
                    equals: userid,
                },
            },
            include: {
                taskCheck: true,
            },
        })
    }

    res.json(result)
}

export default listtask
