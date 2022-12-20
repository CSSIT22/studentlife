import { Request, Response } from "express"
import { prisma } from "@prisma/client"
//import { course } from ".."

const getCourses = async (req: Request, res: Response) => {
    try {
        const prisma = res.prisma
        const course = await prisma.course.findMany({
            select: {
                courseId: true,
                courseName: true,
            },
            orderBy: {
                courseName: "asc",
            },
        })
        res.send(course)
        //console.log(course)
    } catch (err) {
        return res.send(err)
    }
}

export default getCourses
