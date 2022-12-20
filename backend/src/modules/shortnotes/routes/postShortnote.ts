import { prisma } from "@prisma/client"
import { Request, Response } from "express"

const postShortnote = async (req: Request<any>, res: Response<any>) => {
    const body = req.body
    try {
        const prisma = res.prisma
        const user: any = req.user?.userId

        const findCourse = await prisma.course.findFirstOrThrow({
            where: {
                courseName: req.body.courseId,
            },
        })
        //console.log(findCourse)
        const payload: any = {
            course: {
                connectOrCreate: {
                    where: {
                        courseId: findCourse.courseId,
                    },
                    create: {
                        courseName: req.body.courseId,
                        lecturer: "unknown",
                    },
                },
            },
            owner: {
                connect: {
                    userId: user,
                },
            },
            isPublic: req.body.isPublic == "true",
            snName: req.body.snName,
            snDesc: req.body.snDesc,
            snLink: "",
        }

        const sn = await prisma.sn_Head.create({
            data: payload,
        })

        const lastSn = await prisma.sn_Head.findFirstOrThrow({
            where: {
                userId: user,
            },
            orderBy: {
                created: "desc",
            },
        })

        if (payload.isPublic == false) {
            const payload2: any = {
                snId: lastSn.snId,
                userId: user,
            }

            const ac = await prisma.sn_Access.create({
                data: payload2,
            })
        }

        res.json(lastSn)
    } catch (err) {
        //console.log(err)
        return res.send(err)
    }
}

export default postShortnote
